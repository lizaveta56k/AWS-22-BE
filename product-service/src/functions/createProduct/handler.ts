import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { Product } from "@models/Product";

import schema from './schema';

import { create } from "@db/products";
import { createStock } from "@db/stocks";

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    var createProductResult = await create(event.body.title, event.body.description, event.body.price);
    var newProduct = createProductResult[0] as Product;

    if (newProduct && newProduct.id && event?.body?.count > 0) {
        await createStock(newProduct.id, event.body.count)
    }

    return formatJSONResponse(newProduct);
};


export const main = middyfy(createProduct);
