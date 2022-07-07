import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { moveObjectsToParsed, parseCSVFile } from '@libs/s3Helper';
import { sendItemToSQS } from '@libs/communicationService';

const importFileParser = async (event) => {
    console.log(event);

    for (const record of event?.Records) {
        if (record.s3.object.key.endsWith('.csv')) {
            var messages = await parseCSVFile(record.s3.object.key);
            console.log(messages);

            messages.map(async (item) => await sendItemToSQS(JSON.stringify(item)));
        }
    }

    await moveObjectsToParsed(event?.Records);

    return formatJSONResponse(event);
};

export const main = middyfy(importFileParser);
