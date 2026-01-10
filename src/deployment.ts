import { Chart, Duration, Size } from 'cdk8s';
import {
  Capability,
  ConnectionScheme,
  ContainerResources,
  Cpu,
  Deployment,
  DeploymentStrategy,
  ImagePullPolicy,
  LabeledNode,
  LabelSelector,
  NodeLabelQuery,
  PercentOrAbsolute,
  Probe,
  Protocol,
  SeccompProfileType,
  ServiceAccount,
  Volume,
} from 'cdk8s-plus-32';
import { Construct } from 'constructs';

export interface MetricServerDeploymentProps {
  name: string;
  serviceAccount: ServiceAccount;
  /**
   * Number of replicas.
   * @default 1
   */
  replicas?: number;
  resources?: ContainerResources;
}

export class MetricServerDeployment extends Construct {
  public readonly deployment: Deployment;

  constructor(
    scope: Construct,
    id: string,
    props: MetricServerDeploymentProps,
  ) {
    super(scope, id);

    this.deployment = new Deployment(this, 'Deployment', {
      metadata: {
        name: props.name,
      },
      strategy: DeploymentStrategy.rollingUpdate({
        maxUnavailable: PercentOrAbsolute.absolute(0),
      }),
      containers: [
        {
          args: [
            '--cert-dir=/tmp',
            '--secure-port=10250',
            '--kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname',
            '--kubelet-use-node-status-port',
            '--metric-resolution=15s',
          ],
          image: 'registry.k8s.io/metrics-server/metrics-server:v0.8.0',
          name: props.name,
          imagePullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
          ports: [
            {
              number: 10250,
              name: 'https',
              protocol: Protocol.TCP,
            },
          ],
          liveness: Probe.fromHttpGet('/livez', {
            scheme: ConnectionScheme.HTTPS,
            port: 443,
            periodSeconds: Duration.seconds(10),
            failureThreshold: 3,
          }),
          readiness: Probe.fromHttpGet('/readyz', {
            scheme: ConnectionScheme.HTTPS,
            port: 443,
            initialDelaySeconds: Duration.seconds(20),
            periodSeconds: Duration.seconds(10),
            failureThreshold: 3,
          }),
          resources: {
            cpu: {
              request: props.resources?.cpu?.request || Cpu.millis(100),
              limit: props.resources?.cpu?.limit || undefined,
            },
            memory: {
              request: props.resources?.memory?.request || Size.mebibytes(200),
              limit: props.resources?.memory?.limit || undefined,
            },
          },
          securityContext: {
            capabilities: {
              drop: [Capability.ALL],
            },
            user: 1000,
            seccompProfile: {
              type: SeccompProfileType.RUNTIME_DEFAULT,
            },
          },
          volumeMounts: [
            {
              path: '/tmp',
              volume: Volume.fromEmptyDir(this, 'VolumeTmp', 'tmp-dir'),
            },
          ],
        },
      ],
      serviceAccount: props.serviceAccount,
      replicas: props.replicas || 1,
    });

    const chart = Chart.of(this);
    chart.labels;

    this.deployment.select(
      LabelSelector.of({
        labels: { ...chart.labels },
      }),
    );

    const linuxNodes = new LabeledNode([
      NodeLabelQuery.is('kubernetes.io/os', 'linux'),
    ]);

    this.deployment.scheduling.attract(linuxNodes);
  }
}
