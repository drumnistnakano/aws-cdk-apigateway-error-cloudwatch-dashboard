import * as cdk from 'aws-cdk-lib'
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import {
    GraphWidget,
    Metric,
    SingleValueWidget,
} from 'aws-cdk-lib/aws-cloudwatch'
import { Construct } from 'constructs'

export class CloudWatchStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const stageName = cdk.Fn.importValue('StageName')
        const apiName = cdk.Fn.importValue('ApiName')

        const single4XXWidget = new SingleValueWidget({
            title: 'APIGW 4XX Error Count',
            height: 6,
            width: 12,
            metrics: [
                new Metric({
                    namespace: 'AWS/ApiGateway',
                    metricName: '4XXError',
                    dimensionsMap: {
                        Stage: stageName,
                        ApiName: apiName,
                    },
                    statistic: 'Sum',
                }),
            ],
        })

        const single5XXWidget = new SingleValueWidget({
            title: 'APIGW 5XX Error Count',
            height: 6,
            width: 12,
            metrics: [
                new Metric({
                    namespace: 'AWS/ApiGateway',
                    metricName: '5XXError',
                    dimensionsMap: {
                        Stage: stageName,
                        ApiName: apiName,
                    },
                    statistic: 'Sum',
                }),
            ],
        })

        const graph4XXWidget = new GraphWidget({
            title: 'APIGW 4XX Error',
            width: 24,
            left: [
                new Metric({
                    namespace: 'AWS/ApiGateway',
                    metricName: '4XXError',
                    dimensionsMap: {
                        Stage: stageName,
                        ApiName: apiName,
                    },
                    statistic: 'Sum',
                }),
            ],
        })

        const graph5XXWidget = new GraphWidget({
            title: 'APIGW 5XX Error',
            width: 24,
            left: [
                new Metric({
                    namespace: 'AWS/ApiGateway',
                    metricName: '5XXError',
                    dimensionsMap: {
                        Stage: stageName,
                        ApiName: apiName,
                    },
                    statistic: 'Sum',
                }),
            ],
        })

        new cloudwatch.Dashboard(this, 'APIDashboard', {
            dashboardName: 'APIDashBoard',
            periodOverride: cloudwatch.PeriodOverride.AUTO,
            widgets: [
                [single4XXWidget, single5XXWidget],
                [graph4XXWidget],
                [graph5XXWidget],
            ],
        })
    }
}
