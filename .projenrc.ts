import { Cdk8sLibrary } from '@jttc/projen-project-types';
const project = new Cdk8sLibrary({
  author: 'Antonio Márquez Pérez',
  authorAddress: 'antonio.marquez@jumptothecloud.tech',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  devDeps: ['@jttc/projen-project-types'],
  jsiiVersion: '~5.9.0',
  name: 'cdk8s-metric-server',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:JumpToTheCloud/cdk8s-metric-server.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
