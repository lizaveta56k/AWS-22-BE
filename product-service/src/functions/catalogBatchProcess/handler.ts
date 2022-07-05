import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { sendNotificationEmail } from '@libs/communicationService';
// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { Product } from "@models/Product";

// import schema from './schema';

// import { createWithStock } from "@db/products";

// const catalogBatchProcess: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
const catalogBatchProcess = async (event) => {
    
    console.log(event.Records);
    await sendNotificationEmail(event);

    // const createProductResult = await createWithStock(event.body.title, event.body.description, event.body.price, event.body.count);
    // const newProduct = createProductResult.rows[0] as Product;

    return formatJSONResponse(event);
};


export const main = middyfy(catalogBatchProcess);
