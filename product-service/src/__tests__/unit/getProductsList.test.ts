import { APIGatewayProxyEvent } from "aws-lambda";
import { main as getProductsList } from '@functions/getProductsList/handler';
import { Context as LambdaContext, } from 'aws-lambda';
import productsRaw from "@data/products.json";

describe('Unit test for getProductsList handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {} as any

        const context: LambdaContext = {
            functionName: "getProductsList"
        } as any

        const result = await getProductsList(event, context);

        expect(result.statusCode).toEqual(200);
    });
});

describe('Unit test for getProductsList handler', function () {
    it('verifies return all items', async () => {
        const event: APIGatewayProxyEvent = {} as any

        const context: LambdaContext = {
            functionName: "getProductsList"
        } as any

        const result = await getProductsList(event, context);

        expect(JSON.parse(result.body)?.items).toEqual(productsRaw);
    });
});