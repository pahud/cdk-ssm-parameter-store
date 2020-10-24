# cdk-ssm-parameter-store

AWS CDK construct that allows you to get the latest `Version` of the AWS SSM Parameters.

# Sample

```ts
import * as param from 'cdk-ssm-parameter-store';

const stack = new Stack(app, 'testing-stack', { env });

const p = new param.Provider(stack, 'ParameterProvider');
const fooVersion = p.get('Foo').getAttString('Version');
const barVersion = p.get('Bar').getAttString('Version');

new CfnOutput(stack, 'FooVersion', { value: fooVersion });
new CfnOutput(stack, 'BarVersion', { value: barVersion });
```