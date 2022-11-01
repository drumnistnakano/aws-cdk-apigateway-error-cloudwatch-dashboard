import * as cdk from 'aws-cdk-lib'
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import {
    GraphWidget,
    MathExpression,
    Metric,
    SingleValueWidget,
} from 'aws-cdk-lib/aws-cloudwatch'
import { Construct } from 'constructs'

export class CloudWatchStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const stageName = cdk.Fn.importValue('StageName')
        const apiName = cdk.Fn.importValue('ApiName')

        const singleAPIRequestCountWidget = new SingleValueWidget({
            title: 'APIGW Request Count',
            height: 4,
            width: 24,
            setPeriodToTimeRange: true,
            metrics: [
                new Metric({
                    namespace: 'AWS/ApiGateway',
                    metricName: 'Count',
                    dimensionsMap: {
                        Stage: stageName,
                        ApiName: apiName,
                    },
                    statistic: 'Sum',
                }),
            ],
        })

        const single4XXWidget = new SingleValueWidget({
            title: 'APIGW 4XX Error Count',
            height: 4,
            width: 12,
            setPeriodToTimeRange: true,
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

        const single4XXErrorRateWidget = new SingleValueWidget({
            title: 'APIGW 4XX Error Rate',
            height: 4,
            width: 12,
            fullPrecision: true,
            setPeriodToTimeRange: true,
            metrics: [
                new MathExpression({
                    label: '4XXエラー発生率(%)',
                    expression: 'e1/e2*100',
                    usingMetrics: {
                        e1: new Metric({
                            namespace: 'AWS/ApiGateway',
                            metricName: '4XXError',
                            dimensionsMap: {
                                Stage: stageName,
                                ApiName: apiName,
                            },
                            statistic: 'Sum',
                        }),
                        e2: new Metric({
                            namespace: 'AWS/ApiGateway',
                            metricName: 'Count',
                            dimensionsMap: {
                                Stage: stageName,
                                ApiName: apiName,
                            },
                            statistic: 'Sum',
                        }),
                    },
                }),
            ],
        })

        const single5XXWidget = new SingleValueWidget({
            title: 'APIGW 5XX Error Count',
            height: 4,
            width: 12,
            setPeriodToTimeRange: true,
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

        const single5XXErrorRateWidget = new SingleValueWidget({
            title: 'APIGW 5XX Error Rate',
            height: 4,
            width: 12,
            fullPrecision: true,
            setPeriodToTimeRange: true,
            metrics: [
                new MathExpression({
                    label: '5XXエラー発生率(%)',
                    expression: 'e1/e2*100',
                    usingMetrics: {
                        e1: new Metric({
                            namespace: 'AWS/ApiGateway',
                            metricName: '5XXError',
                            dimensionsMap: {
                                Stage: stageName,
                                ApiName: apiName,
                            },
                            statistic: 'Sum',
                        }),
                        e2: new Metric({
                            namespace: 'AWS/ApiGateway',
                            metricName: 'Count',
                            dimensionsMap: {
                                Stage: stageName,
                                ApiName: apiName,
                            },
                            statistic: 'Sum',
                        }),
                    },
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
                [singleAPIRequestCountWidget],
                [
                    single4XXWidget,
                    single5XXWidget,
                    single4XXErrorRateWidget,
                    single5XXErrorRateWidget,
                ],
                [graph4XXWidget],
                [graph5XXWidget],
            ],
        })
    }
}
