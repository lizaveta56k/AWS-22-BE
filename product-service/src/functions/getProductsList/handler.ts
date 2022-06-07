import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const getProductsList = async (event) => {
  return formatJSONResponse({
    message: 'Hello Test, welcome to the exciting Serverless world!',
    event,
  });
};

export const main = middyfy(getProductsList);
