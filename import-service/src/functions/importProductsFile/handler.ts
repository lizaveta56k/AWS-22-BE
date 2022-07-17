import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { createSignedUrl } from '@libs/s3Helper';

const importProductsFile = async (event) => {
    console.log(event);

    const fileName = event?.pathParameters?.name;

    if (!fileName) {
        return formatJSONResponse({ error: `Please provide fileName`, statusCode: 404 });
    }

    const signedUrl = await createSignedUrl(fileName);

    return formatJSONResponse({ signedUrl });
};

export const main = middyfy(importProductsFile);
