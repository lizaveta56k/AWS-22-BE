import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { Product } from "@models/Product";

import schema from './schema';

import { createWithStock } from "@db/products";

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    console.log(event);

    const createProductResult = await createWithStock(event.body.title, event.body.description, event.body.price, event.body.count);
    const newProduct = createProductResult.rows[0] as Product;

    return formatJSONResponse(newProduct);
};


export const main = middyfy(createProduct);
