# Deprecating

We are deprecating this construct library, please use the following method from `@aws-cdk/aws-ssm` instead.

```ts
ssm.StringParameter.valueForStringParameter()
```



[![NPM version](https://badge.fury.io/js/cdk-ssm-parameter-store.svg)](https://badge.fury.io/js/cdk-ssm-parameter-store)
[![PyPI version](https://badge.fury.io/py/cdk-ssm-parameter-store.svg)](https://badge.fury.io/py/cdk-ssm-parameter-store)
![Release](https://github.com/pahud/cdk-ssm-parameter-store/workflows/Release/badge.svg)


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
