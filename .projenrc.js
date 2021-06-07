const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  authorAddress: 'pahudnet@gmail.com',
  authorName: 'Pahud Hsieh',
  cdkVersion: '1.82.0',
  name: 'cdk-ssm-parameter-store',
  description: 'AWS CDK construct that allows you to get the latest Version of the AWS SSM Parameters',
  repository: 'https://github.com/pahud/cdk-ssm-parameter-store.git',
  defaultReleaseBranch: 'master',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/custom-resources',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-ssm',
  ],
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
  keywords: [
    'ssm',
    'parameter',
    'cdk',
  ],
  catalog: {
    twitter: 'pahudnet',
    announce: false,
  },

  python: {
    distName: 'cdk-ssm-parameter-store',
    module: 'cdk_ssm_parameter_store',
  },
});


const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log',
  'docker-image-publish.yml', 'utils'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
