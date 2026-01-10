import { Cdk8sLibrary, K8sVersion } from '@jttc/projen-project-types';
import { ReleasableCommits } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { AppPermission } from 'projen/lib/github/workflows-model';
import { UpgradeDependenciesSchedule } from 'projen/lib/javascript';
import { ReleaseTrigger } from 'projen/lib/release';
const project = new Cdk8sLibrary({
  author: 'Jump To The Cloud',
  authorAddress: 'antonio.marquez@jumptothecloud.tech',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  devDeps: ['@jttc/projen-project-types'],
  jsiiVersion: '~5.9.0',
  name: 'cdk8s-metric-server',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:JumpToTheCloud/cdk8s-metric-server.git',
  appFile: 'index.ts',
  k8sVersion: K8sVersion.V1_32,
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  packageName: '@jttc/cdk8s-metric-server',
  peerDeps: ['cdk8s'],
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['github-actions[bot]'],
    secret: 'PROJEN_GITHUB_TOKEN',
  },
  release: true,
  releaseTrigger: ReleaseTrigger.workflowDispatch(),
  releasableCommits: ReleasableCommits.featuresAndFixes(),
  depsUpgrade: true,
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  majorVersion: 1,
  prerelease: 'beta',
  jestOptions: {
    jestConfig: {
      verbose: true,
    },
  },
  githubOptions: {
    projenCredentials: GithubCredentials.fromApp({
      permissions: {
        pullRequests: AppPermission.WRITE,
        contents: AppPermission.WRITE,
      },
    }),
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: [
          'feat',
          'fix',
          'chore',
          'docs',
          'style',
          'refactor',
          'test',
          'revert',
          'ci',
        ],
      },
    },
  },
});
project.synth();
