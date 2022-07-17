import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { moveObjectsToParsed, parseCSVFile } from '@libs/s3Helper';

const importFileParser = async (event) => {
    console.log(event);

    for (const record of event?.Records) {
        if (record.s3.object.key.endsWith('.csv')) {
            await parseCSVFile(record.s3.object.key);
        }
    }

    await moveObjectsToParsed(event?.Records)

    return formatJSONResponse(event);
};

export const main = middyfy(importFileParser);
