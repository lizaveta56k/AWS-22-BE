import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      { Effect: 'Allow', Action: 's3:ListBucket', Resource: 'arn:aws:s3:::import-service-task5' },
      { Effect: 'Allow', Action: 's3:*', Resource: 'arn:aws:s3:::import-service-task5/*' },
      { Effect: 'Allow', Action: 'sqs:*', Resource: { 'Fn::GetAtt': ['SQSQueue', 'Arn'] } },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      S3REGION: 'us-east-1',
      S3BUCKETNAME: 'import-service-task5',
      SQS_URL: 'import-service-sqs-6',
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'import-service-sqs-6'
        }
      },
      GatewayResponseDefault4XX:{
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters:{
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Credentials': "'true'", 
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: 'authServiceID'
        }
      }
    }
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
