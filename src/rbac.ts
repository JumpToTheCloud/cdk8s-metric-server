import {
  ApiResource,
  ClusterRole,
  ClusterRoleBinding,
  IApiEndpoint,
  Role,
  RoleBinding,
  ServiceAccount,
} from 'cdk8s-plus-32';
import { Construct } from 'constructs';

export class MetricServerRBAC extends Construct {
  constructor(scope: Construct, id: string, serviceAccount: ServiceAccount) {
    super(scope, id);

    // Aggregated metrics reader cluster role
    const clusterRoleAggregated = new ClusterRole(
      this,
      'ClusterRoleAggregated',
      {
        metadata: {
          name: 'system:aggregated-metrics-reader',
          labels: {
            'rbac.authorization.k8s.io/aggregate-to-admin': 'true',
            'rbac.authorization.k8s.io/aggregate-to-edit': 'true',
            'rbac.authorization.k8s.io/aggregate-to-view': 'true',
          },
        },
      },
    );

    const podsMetricApiResource: IApiEndpoint = ApiResource.custom({
      apiGroup: 'metrics.k8s.io',
      resourceType: 'pods',
    });
    const nodesMetricApiResource: IApiEndpoint = ApiResource.custom({
      apiGroup: 'metrics.k8s.io',
      resourceType: 'nodes',
    });

    clusterRoleAggregated.allow(
      ['get', 'list', 'watch'],
      podsMetricApiResource,
      nodesMetricApiResource,
    );

    // Metrics server cluster role
    const clusterRoleMetricServer = new ClusterRole(
      this,
      'ClusterRoleMetricServer',
      {
        metadata: {
          name: 'system:metrics-server',
        },
      },
    );

    const nodesMetricServerApiResource: IApiEndpoint = ApiResource.custom({
      apiGroup: '',
      resourceType: 'nodes/metrics',
    });

    clusterRoleMetricServer.allowGet(nodesMetricServerApiResource);
    clusterRoleMetricServer.allow(
      ['get', 'list', 'watch'],
      ApiResource.PODS,
      ApiResource.NODES,
    );

    // Cluster role bindings
    const clusterRoleBindingAggregated = new ClusterRoleBinding(
      this,
      'ClusterRoleBindingAggregated',
      {
        metadata: {
          name: 'metrics-server:system:auth-delegator',
        },
        role: ClusterRole.fromClusterRoleName(
          this,
          'SystemAuthDelegator',
          'system:auth-delegator',
        ),
      },
    );
    clusterRoleBindingAggregated.addSubjects(serviceAccount);

    const metricServerClusterRoleBinding = new ClusterRoleBinding(
      this,
      'ClusterRoleBindingMetricServer',
      {
        metadata: {
          name: 'system:metrics-server',
        },
        role: clusterRoleMetricServer,
      },
    );
    metricServerClusterRoleBinding.addSubjects(serviceAccount);

    // Role binding
    const roleBinding = new RoleBinding(this, 'RoleBindingMetricServer', {
      metadata: {
        name: 'metrics-server-auth-reader',
      },
      role: Role.fromRoleName(
        this,
        'Role',
        'extension-apiserver-authentication-reader',
      ),
    });
    roleBinding.addSubjects(serviceAccount);
  }
}
