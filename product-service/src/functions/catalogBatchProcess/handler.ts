import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { sendNotificationEmail } from '@libs/communicationService';
import { Product, ProductSchema } from "@models/Product";

import { createWithStock } from "@db/products";

const catalogBatchProcess = async (event) => {
    console.log(event);

    const messages = event.Records;
    let validationErrors = [];

    await Promise.all(messages.map(async (item) => {
        let newProduct = {};
        const product = JSON.parse(item.body);
        const isValid = await ProductSchema.isValid(product);
        if (isValid) {
            const createProductResult = await createWithStock(
                product.title, product.description, parseInt(product.price, 10), product.count
            );

            newProduct = createProductResult.rows[0] as Product;

            await sendNotificationEmail(JSON.stringify(newProduct), product.price);
        }
        else {
            validationErrors.push(
                `Can't convert message payload with Id=${item.messageId} to product`)
        }
    }));

    console.log(validationErrors)

    return formatJSONResponse({...event, validationErrors});
};


export const main = middyfy(catalogBatchProcess);
