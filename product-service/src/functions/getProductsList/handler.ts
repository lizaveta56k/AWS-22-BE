import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from "@models/Product";

import { getExist } from "@db/products";

const getProductsList = async (event) => {
    console.log(event);

    try {
        const productsDB = await getExist() as Product[];

        return formatJSONResponse({
            items: productsDB
        });
    }
    catch (e) {
        return formatJSONResponse({ info: e }, 500);
    }
};

export const main = middyfy(getProductsList);
