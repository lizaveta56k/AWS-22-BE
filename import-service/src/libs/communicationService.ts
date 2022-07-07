import { sqsClient } from "./sqsClient";
import { SendMessageCommand } from "@aws-sdk/client-sqs";

export const sendItemToSQS = async (message) => {
    try {
        // Set the parameters
        const params = {
            DelaySeconds: 10,
            MessageAttributes: {
                Title: {
                    DataType: "String",
                    StringValue: "New product request",
                },
                Author: {
                    DataType: "String",
                    StringValue: "import-service",
                },
            },
            MessageBody: message,
            QueueUrl: process.env.SQS_URL
        };

        const data = await sqsClient.send(new SendMessageCommand(params));

        console.log("Success, message sent. MessageID:", data.MessageId);
        return data;
    } catch (err) {
        console.log("Error sending message to SQS queue", err);
    }
};
