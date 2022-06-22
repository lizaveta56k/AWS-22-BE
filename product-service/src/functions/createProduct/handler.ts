import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from "@models/Product";

import { crateProduct } from "@db/products";

const createProduct = async (event) => {
    console.log(event);
};

export const main = middyfy(createProduct);
