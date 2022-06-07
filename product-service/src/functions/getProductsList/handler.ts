import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// import { Product } from "models/Product";

import productList from "../../data/products.json";

const getProductsList = async () => {
    return formatJSONResponse({
        items: productList
    });
};

export const main = middyfy(getProductsList);
