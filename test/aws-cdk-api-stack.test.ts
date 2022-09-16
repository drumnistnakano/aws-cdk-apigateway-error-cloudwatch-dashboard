import { Template } from 'aws-cdk-lib/assertions'
import { App } from 'aws-cdk-lib'
import { ApiStack } from '../lib/aws-cdk-api-stack'

test('ApiStack Snapshot Test', () => {
    const app = new App()
    const stack = new ApiStack(app, 'ApiStack', {})
    const template = Template.fromStack(stack)
    expect(template.toJSON()).toMatchSnapshot()
})
