import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { sendNotificationEmail } from '@libs/communicationService';
import { Product } from "@models/Product";

import { createWithStock } from "@db/products";

const catalogBatchProcess = async (event) => {
    console.log(event);

    const messages = event.Records;

    messages.map(async (item) => {
        const product = JSON.parse(item.body);

        const createProductResult = await createWithStock(
            product.title, product.description, parseInt(product.price, 10), product.count
        );

        const newProduct = createProductResult.rows[0] as Product;

        await sendNotificationEmail(newProduct);
    })

    return formatJSONResponse(event);
};


export const main = middyfy(catalogBatchProcess);
