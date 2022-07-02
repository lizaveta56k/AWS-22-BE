import { APIGatewayProxyEvent } from "aws-lambda";
import { main as importProductsFile } from '@functions/importProductsFile/handler';
import { Context as LambdaContext, } from 'aws-lambda';

describe('Unit test for importProductsFile handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                name: "Product1"
            }
        } as any

        const context: LambdaContext = {
            functionName: "importProductsFile"
        } as any

        const result = await importProductsFile(event, context);

        expect(result.statusCode).toEqual(200);
    });

    describe('Unit test for importProductsFile handler', function () {
        it('verifies return error for empty name', async () => {
            const event: APIGatewayProxyEvent = {
                pathParameters: {
                }
            } as any

            const context: LambdaContext = {
                functionName: "importProductsFile"
            } as any

            const result = await importProductsFile(event, context);

            expect(result.statusCode).toEqual(404);
        });
    });
});