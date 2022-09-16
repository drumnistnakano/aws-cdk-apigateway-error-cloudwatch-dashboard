import { Template } from 'aws-cdk-lib/assertions'
import { App } from 'aws-cdk-lib'
import { CloudWatchStack } from '../lib/aws-cdk-cloudwatch-dashboard'

test('CloudWatchStack Snapshot Test', () => {
    const app = new App()
    const stack = new CloudWatchStack(app, 'CloudWatchStack', {})
    const template = Template.fromStack(stack)
    expect(template.toJSON()).toMatchSnapshot()
})
