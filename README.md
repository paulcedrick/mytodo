# A Simple Todo

## How to run locally

To run this one locally, you simply have to run `pnpm install`. Once done, you can just run `pnpm dev` to start the server.

## How to run using AWS

### How to run using API GW + Lambda locally

Before I detail how to start using this one using serverless, I have to briefly mention that I use SST for this one. SST is basically a library that sits on top of CDK in order to help us develop using serverless technologies such as Lambda, SQS, SNS, API GW, etc. To know more about SST, you can check (sst.dev)[https://sst.dev/]

To run the setup using AWS API Gateway + Lambda, setup your AWS CLI first. You can check (this link)[https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file] on how to setup your AWS CLI. When you're done setting up your AWS CLI, run `AWS_PROFILE=<whatever aws profile you have> pnpm sst:dev`. It'll ask for a namespace name before it starts deploying API Gateway + Lambda w/ Live Lambda Support. To know more about live lambda, (click this link)[https://docs.sst.dev/live-lambda-development].

### How to deploy to AWS Account

To deploy using AWS, kindly setup your AWS CLI first. You can check (this link)[https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file] on how to setup your AWS CLI. When you're done setting up your AWS CLI, you can just run `AWS_PROFILE=<whatever aws profile you have> pnpm sst:deploy`. This will set up an API Gatway and Lambda to your AWS Account.

### Things to note

Given that it's currently deployed using lambda, there will be instances where concurrent request will have differing data. The reason for this is because of the lambda nature itself. Since it's not running in a long-running server, the initially stored data will reset the moment that the initial function was decomissioned already. To overcome this situation, we just need to transform the data layer and use a separate database instead (DynamoDB or Planetscale)

## Assumptions Made

These are the following assumptions with regards to requirements:

- there's no need to authenticate the users that will be adding, updating or deleting the records.
- there's no need to specify who created or updated a particular todo
- the getter for all todos doesn't necessarily need to return the total number of items
- there's no need to soft delete the items

These are the following assumptions with regards to running the api locally:

- you have already node v18 and above
- you already have pnpm setup
