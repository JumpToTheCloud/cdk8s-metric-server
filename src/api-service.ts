import { ApiObject, Chart } from 'cdk8s';
import { Construct } from 'constructs';

export interface MetricServerAPIServiceProps {
  name?: string;
}

export class MetricServerApiService extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props?: MetricServerAPIServiceProps,
  ) {
    super(scope, id);
    const chart = Chart.of(scope);
    new ApiObject(this, 'APIService', {
      apiVersion: 'apiregistration.k8s.io/v1',
      kind: 'APIService',
      metadata: {
        name: 'v1beta1.metrics.k8s.io',
      },
      spec: {
        group: 'metrics.k8s.io',
        groupPriorityMinimum: 100,
        insecureSkipTLSVerify: true,
        service: {
          name: props?.name || 'metric-server',
          namespace: chart.namespace,
        },
        version: 'v1beta1',
        versionPriority: 100,
      },
    });
  }
}
