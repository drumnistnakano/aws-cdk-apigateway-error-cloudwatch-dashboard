#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { ApiStack } from '../lib/aws-cdk-api-stack'
import { CloudWatchStack } from '../lib/aws-cdk-cloudwatch-dashboard'

const app = new cdk.App()

const apiStack = new ApiStack(app, 'ApiStack')

const cloudwatchStack = new CloudWatchStack(app, 'CloudWatchStack')

cloudwatchStack.addDependency(apiStack)
