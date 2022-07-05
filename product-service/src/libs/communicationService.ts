import { snsClient } from "./snsClient";
import { PublishCommand } from "@aws-sdk/client-sns";

export const sendNotificationEmail = async (products) => {
    try {
        // Set the email parameters
        const params = {
            Subject: 'Create New Products Notification',
            Message: JSON.stringify(products),
            TopicArn: process.env.SNS_ARN
        };

        const data = await snsClient.send(new PublishCommand(params));
        console.log("Success.",  data);

        return data;
    } catch (err) {
        console.log("Error sending message to SNS", err);
    }
};

