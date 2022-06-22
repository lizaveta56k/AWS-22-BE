import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from "@models/Product";

import { getExist } from "@db/products";

const getProductsList = async (event) => {
    console.log(event);

    const productsDB = await getExist() as Product[];

    return formatJSONResponse({
        items: productsDB
    });
};

export const main = middyfy(getProductsList);
