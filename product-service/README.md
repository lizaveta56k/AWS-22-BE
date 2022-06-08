# Product Service - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

## Swagger:

[Swagger API](https://7i0zp74ihb.execute-api.eu-west-1.amazonaws.com/swagger)
## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS
### Locally

In order to test any function locally, run the following command:

- `npx run offlinerun` if you're using NPM

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code for lambda functions
- `libs` - containing shared code base between  lambdas
- `data` - containing data
- `models` - containing models

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── hello
│   │   │   ├── handler.ts      # `Hello` lambda source code
│   │   │   ├── index.ts        # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json       # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```
