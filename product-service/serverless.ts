import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    region: 'us-east-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow', Action: 'sqs:*',
        Resource: ''
      },
      { Effect: 'Allow', Action: 'sns:*', Resource: { Ref: 'SNSTopic' } },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PGHOST: '',
      PGPORT: '5432',
      PGDATABASE: 'shop',
      PGUSER: 'lizka',
      PGPASSWORD: '',
      SQS_URL: 'import-service-sqs-6',
      SNS_ARN: { Ref: 'SNSTopic' }
    },
  },
  resources: {
    Resources: {
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'import-service-topic-6'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'myemail@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            "price": [{"numeric": [">=", 30]}]
          }
        }
      },
      SNSSubscriptionCheap: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'myemail+cheap@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            "price": [{"numeric": ["<", 30]}]
          }
        }
      },
    }
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct, catalogBatchProcess },
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
