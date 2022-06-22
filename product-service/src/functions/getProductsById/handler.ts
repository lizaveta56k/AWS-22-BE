import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from "@models/Product";

import { getById } from "@db/products";

const getProductsById = async (event) => {
    console.log(event);

    try {
        const productId = event?.pathParameters?.productId;
        const selectedProduct = await getById(productId) as Product;

        if (!productId) {
            return formatJSONResponse({ error: `Please provide product ID`, statusCode: 404 });
        }

        if (!selectedProduct) {
            return formatJSONResponse({ error: `Product not found`, statusCode: 404 });
        }

        return formatJSONResponse(selectedProduct);
    }
    catch (e) {
        return formatJSONResponse({ info: e }, 500);
    }
};

export const main = middyfy(getProductsById);
