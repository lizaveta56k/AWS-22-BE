import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from "@models/Product";

import productsRaw from "@data/products.json";
import { getAll } from "../../db/products";

const getProductsList = async () => {
    const products = productsRaw as Product[];
    const productsDB = await getAll();
    console.log(productsDB);

    return formatJSONResponse({
        items: products
    });
};

export const main = middyfy(getProductsList);
