import { APIGatewayProxyEvent } from "aws-lambda";
import { main as getProductsById } from '@functions/getProductsById/handler';
import { Context as LambdaContext, } from 'aws-lambda';
import { Product } from "@models/Product";

describe('Unit test for getProductsById handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                productId: "Product1"
            }
        } as any

        const context: LambdaContext = {
            functionName: "getProductsById"
        } as any

        const result = await getProductsById(event, context);

        expect(result.statusCode).toEqual(200);
    });

    describe('Unit test for getProductsById handler', function () {
        it('verifies return error for Invalid ID', async () => {
            const event: APIGatewayProxyEvent = {
                pathParameters: {
                    productId: "Product177"
                }
            } as any

            const context: LambdaContext = {
                functionName: "getProductsById"
            } as any

            const result = await getProductsById(event, context);

            expect(JSON.parse(result.body)?.error).toEqual('Product not found');
        });
    });

    describe('Unit test for getProductsById handler', function () {
        it('verifies return no error for valid ID', async () => {
            const event: APIGatewayProxyEvent = {
                pathParameters: {
                    productId: "Product1"
                }
            } as any

            const context: LambdaContext = {
                functionName: "getProductsById"
            } as any

            const result = await getProductsById(event, context);

            expect(JSON.parse(result.body)?.error).toBeUndefined();
        });
    });

    describe('Unit test for getProductsById handler', function () {
        it('verifies return no Product', async () => {
            const event: APIGatewayProxyEvent = {
                pathParameters: {
                    productId: "Product1"
                }
            } as any

            const context: LambdaContext = {
                functionName: "getProductsById"
            } as any

            const result = await getProductsById(event, context);
            const testProduct: Product = {
                id: "Product1",
                title: "Nomade Chloe",
                description: "Nomade by Chloe is a Chypre Floral fragrance for women.",
                price: 49,
                count: 2
            };

            expect(JSON.parse(result.body)).toEqual(testProduct);
        });
    });
});