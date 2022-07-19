import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { generatePolicy } from '@libs/policyHelper';

const basicAuthorizer = async (event) => {
    console.log(event);

    if (!event.queryStringParameters.token) {
        return formatJSONResponse({ response: 'Unautorized' }, 401);
    }

    try {
        const authorizationToken = event.queryStringParameters.token;

        const buff = Buffer.from(authorizationToken, 'base64');
        const plainCreds = buff.toString('utf-8').split(':');
        const username = plainCreds[0];
        const password = plainCreds[1];

        console.log(`userName: ${username} and password: ${password}`);
        const storedPassword = process.env[username];

        const isValidCreds = storedPassword && password == storedPassword;

        const policy = generatePolicy(authorizationToken, event.methodArn, isValidCreds ? 'Allow' : 'Deny');

        return isValidCreds ? formatJSONResponse(policy) : formatJSONResponse(policy, 403);
    }
    catch (e) {
        return formatJSONResponse({ response: `Unautorized: ${e.message}` }, 401);
    }
};

export const main = middyfy(basicAuthorizer);
