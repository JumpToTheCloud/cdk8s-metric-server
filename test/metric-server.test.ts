/**
 * Test the MetricServer construct.
 *
 * @group snapshot
 */
import { Testing } from 'cdk8s';
import { MetricServer } from '../src';

test('renders metric server manifests', () => {
  const app = Testing.app();
  const chart = new MetricServer(app, 'test');

  const manifest = Testing.synth(chart);
  app.synth();
  expect(manifest).toMatchSnapshot();
});
