import fs from 'fs';
import { APIGatewayProxyEvent, Context as LambdaContext } from "aws-lambda";
import { mockClient } from 'aws-sdk-client-mock';
import {
    GetObjectCommand,
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    CopyObjectCommand
} from '@aws-sdk/client-s3';
import AWS from 'aws-sdk-mock';

import { main as importProductsFile } from '@functions/importProductsFile/handler';

const mockS3Client = mockClient(S3Client);

jest.mock('@aws-sdk/s3-request-presigner', () => {
    return {
        getSignedUrl: () => {
          return 'testUrl'
      },
    };
});

AWS.mock('S3', 'getObject', Buffer.from(require('fs').readFileSync('example.csv')));

mockS3Client.on(GetObjectCommand).resolves({
    Body: fs.createReadStream('example.csv'),
});

mockS3Client.on(PutObjectCommand).resolves({});

mockS3Client.on(DeleteObjectCommand).resolves({
    DeleteMarker: true,
});

mockS3Client.on(CopyObjectCommand).resolves({});

describe('Unit tests for importProductsFile handler', function () {
    it('verifies return successful response', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                name: "Product1"
            }
        } as any

        const context: LambdaContext = {
            functionName: "importProductsFile"
        } as any

        const result = await importProductsFile(event, context);
        console.log(result);

        expect(result.statusCode).toEqual(200);
    });

    it('verifies return signed url', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                name: "Product1"
            }
        } as any

        const context: LambdaContext = {
            functionName: "importProductsFile"
        } as any

        const result = await importProductsFile(event, context);

        expect(JSON.parse(result.body)?.signedUrl).toEqual('testUrl');
    });

    it('verifies return error for empty name', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
            }
        } as any

        const context: LambdaContext = {
            functionName: "importProductsFile"
        } as any

        const result = await importProductsFile(event, context);

        expect(JSON.parse(result.body)?.statusCode).toEqual(404);
        expect(JSON.parse(result.body)?.error).toEqual('Please provide fileName');
    });
});
