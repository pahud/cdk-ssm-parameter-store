
import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

/**
 * Parameter Provider
 */
export class Provider extends cdk.Construct {
  private provider: cr.Provider;
  private handler: lambda.Function;
  constructor(scope: cdk.Construct, id:string) {
    super(scope, id);

    this.handler = new lambda.Function(this, 'Handler', {
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'index.on_event',
      code: lambda.Code.fromAsset(path.join(__dirname, '../handler')),
    });

    this.handler.addToRolePolicy(new iam.PolicyStatement({
      actions: ['ssm:DescribeParameters'],
      resources: [
        cdk.Stack.of(this).formatArn({
          service: 'ssm',
          resource: '*',
        }),
      ],
    }));

    this.provider = new cr.Provider(this, 'ParameterResourceProvider', {
      onEventHandler: this.handler,
    });
  }

  /**
   * return the parameter resource
   */
  public get(name: string) {
    return new cdk.CustomResource(this, `ParameterResource${name}`, {
      serviceToken: this.provider.serviceToken,
      properties: {
        parameterName: name,
        // force update the resource
        random: randomString(),
      },
    });
  }
}

function randomString() {
  return Math.random().toString(36).replace(/[^a-z0-9]+/g, '');
}