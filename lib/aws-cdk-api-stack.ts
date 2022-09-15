import * as cdk from 'aws-cdk-lib'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'

export class ApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const handler = new lambdaNodejs.NodejsFunction(this, 'ErrorHandler', {
            runtime: lambda.Runtime.NODEJS_16_X,
            entry: 'lambda/handler.ts',
        })

        const api = new apigateway.RestApi(this, 'api_error_endpoint', {
            restApiName: 'api_error_endpoint',
            deployOptions: {
                stageName: 'dev',
            },
        })

        api.root
            .addResource('text')
            .addMethod('GET', new apigateway.LambdaIntegration(handler))

        new cdk.CfnOutput(this, 'apigatewayStageNameOutPut', {
            value: api.deploymentStage.stageName,
            exportName: 'StageName',
        })

        new cdk.CfnOutput(this, 'apigatewayNameOutPut', {
            value: api.restApiName,
            exportName: 'ApiName',
        })
    }
}
