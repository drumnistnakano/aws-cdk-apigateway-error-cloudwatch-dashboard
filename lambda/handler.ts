import {
    APIGatewayEventRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda'

exports.handler = async (
    event: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> => {
    console.log(JSON.stringify(event, undefined, 2))

    // 擬似的に毎回ランダムなステータスを返す
    const statusArray: Array<number> = [400, 500]
    const status = statusArray[Math.floor(Math.random() * statusArray.length)]

    return {
        statusCode: status,
        headers: { 'Content-Type': 'text/plain' },
        body: `Error: ${event.path} StatusCode: ${status}\n`,
    }
}
