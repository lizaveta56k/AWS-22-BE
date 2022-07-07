import { snsClient } from "./snsClient";
import { PublishCommand } from "@aws-sdk/client-sns";

export const sendNotificationEmail = async (product: string) => {
    try {
        // Set the email parameters
        const params = {
            Subject: 'Create New Products Notification',
            Message: product,
            TopicArn: process.env.SNS_ARN
        };

        const data = await snsClient.send(new PublishCommand(params));
        console.log("Success.",  data);

        return data;
    } catch (err) {
        console.log("Error sending message to SNS", err);
    }
};

