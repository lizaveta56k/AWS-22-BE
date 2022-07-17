import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: {
          'Fn::GetAtt': [
            'TheQueue',
            'Arn'
          ]
        },
        batchSize: 5
      },
    },
  ],
};
