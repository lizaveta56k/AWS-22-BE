import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from "@models/Product";

import productsRaw from "@data/products.json";

const getProductsById = async (event) => {
    const products = productsRaw as Product[];
    let productId = event?.pathParameters?.productId;

    if (!productId) {
        return formatJSONResponse({ error: `Please provide product ID`, statusCode: 404 });
    }

    let selectedProduct = products.find(x => x.id.toLowerCase() === productId?.toLowerCase());

    if (!selectedProduct) {
        return formatJSONResponse({ error: `No product with ID ${productId}`, statusCode: 404 });
    }

    return formatJSONResponse(selectedProduct);
};

export const main = middyfy(getProductsById);
