// Import the required AWS SDK clients and commands for Node.js
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Set parameters
export const bucketParams = (fileName) => {
    return {
        Bucket: process.env.S3BUCKETNAME,
        Key: `uploaded/${fileName}`
    }
};

export const createSignedUrl = async (fileName) => {
    try {
        // Create a command to put the object in the S3 bucket.
        const command = new PutObjectCommand(bucketParams(fileName));
        // Create the presigned URL.
        const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
        });

        return signedUrl;
    } catch (err) {
        console.log("Error creating presigned URL", err);
    }
};

export const getObject = async (fileName) => {
    const params = bucketParams(fileName);
    const getObjectCommand = new GetObjectCommand(params);
    let responseDataChunks = []

    return new Promise(async (resolve, reject) => {
        try {
            const response = await s3Client.send(getObjectCommand)

            // Handle an error while streaming the response body
            response.Body.once('error', err => reject(err))

            // Attach a 'data' listener to add the chunks of data to our array
            // Each chunk is a Buffer instance
            response.Body.on('data', chunk => responseDataChunks.push(chunk))

            // Once the stream has no more data, join the chunks into a string and return the string
            response.Body.once('end', () => resolve(responseDataChunks.join('')))
        } catch (err) {
            return reject(err)
        }
    })
}

