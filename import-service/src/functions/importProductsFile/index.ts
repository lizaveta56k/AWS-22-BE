import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import/{name}',
        cors: true,
        authorizer: {
          name: 'basicAuthorizer',
          arn: 'arn',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token'
        }
      },
    },
  ],
};
