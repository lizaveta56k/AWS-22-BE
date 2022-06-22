import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from "@models/Product";

import { getById } from "@db/products";

const getProductsById = async (event) => {
    const productId = event?.pathParameters?.productId;
    const selectedProduct = await getById(productId) as Product;

    if (!productId) {
        return formatJSONResponse({ error: `Please provide product ID`, statusCode: 404 });
    }

    if (!selectedProduct) {
        return formatJSONResponse({ error: `Product not found`, statusCode: 404 });
    }

    return formatJSONResponse(selectedProduct);
};

export const main = middyfy(getProductsById);
