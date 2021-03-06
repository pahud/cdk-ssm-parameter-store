import { App, Stack, CfnOutput } from '@aws-cdk/core';
import * as param from './';

export class IntegTesting {
  readonly stack: Stack[];

  constructor() {
    const app = new App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new Stack(app, 'testing-stack', { env });

    const p = new param.Provider(stack, 'ParameterProvider', {
      latest: false,
    });
    const fooVersion = p.get('Foo').getAttString('Version');
    const barVersion = p.get('Bar').getAttString('Version');

    new CfnOutput(stack, 'FooVersion', { value: fooVersion });
    new CfnOutput(stack, 'BarVersion', { value: barVersion });

    this.stack = [stack];
  };
}

// run the integ testing
new IntegTesting();
