import { Chart } from 'cdk8s';
import { Protocol, Service, ServiceAccount } from 'cdk8s-plus-32';
import { Construct } from 'constructs';
import { MetricServerApiService } from './api-service';
import { MetricServerDeployment } from './deployment';
import { MetricServerRBAC } from './rbac';

export class MetricServer extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      labels: {
        'k8s-app': 'metric-server',
      },
      namespace: 'kube-system',
    });

    const NAME = 'metric-server';

    // Service Account
    const serviceAccount = new ServiceAccount(this, 'ServiceAccount', {
      metadata: {
        name: NAME,
      },
    });

    // RBAC
    new MetricServerRBAC(this, 'RBAC', serviceAccount);

    // Deployment
    const metricServer = new MetricServerDeployment(
      this,
      'MetricServerDeployment',
      {
        name: NAME,
        serviceAccount,
      },
    );

    // Service
    const service = new Service(this, 'Service', {
      metadata: {
        name: NAME,
      },
    });
    service.bind(443, {
      protocol: Protocol.TCP,
      name: 'https',
    });
    service.select(metricServer.deployment);

    // APIService
    new MetricServerApiService(this, 'APIServiceConstruct');
  }
}
