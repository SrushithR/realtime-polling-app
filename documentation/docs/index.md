## Simple Real time Polling Application

!!! note
    This application was built by [Nader Dabit](https://twitter.com/dabit3). Thank you for your amazing contribution to the Serverless and Amplify community!
    
In this workshop, we will be building a simple real time polling application using GraphQL APIs. By the end of the workshop, you will be able to create polls, upvote candidates and share the poll link to see the power of GraphQL subscriptions in action

<img src="https://user-images.githubusercontent.com/23396903/87696333-47240000-c7ae-11ea-8ac8-fa543d145bce.png">

!!! caution
    This workshop is built on the assumption that you have basic understand of working with AWS and GraphQL   

### List of services consumed
1. [AWS Amplify](https://aws.amazon.com/amplify/) - a set of tools and services that enables mobile and front-end web developers to build secure, scalable full stack applications 
2. [AWS AppSync](https://aws.amazon.com/appsync/) - a managed GraphQL service on AWS 
3. [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) - a  key-value and document database that delivers single-digit millisecond performance at any scale

## Pre-requisites for installation

* Install [Node.js](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/get-npm)
* [Create AWS Account](https://portal.aws.amazon.com/billing/signup#/start) if you already don't have one. This workshop utilises most of the resources that fall under [AWS free tier](https://aws.amazon.com/free/)
* Install [Java](https://java.com/en/download/help/download_options.xml). This will be used for local testing of AppSync APIs

## Installation

Install the Amplify CLI using the following command:

```
npm install -g @aws-amplify/cli
```

### Configuring Amplify CLI

To configure Amplify CLI on your machine, run the following command:

```
amplify configure
```

On running the above command, you will be asked to login to your AWS console. On logging in, Amplify CLI will create an IAM user

```
Specify the AWS Region
? region:  # Your preferred region
Specify the username of the new IAM user:
? user name:  # User name for Amplify IAM user
Complete the user creation using the AWS console
```

Create a user with AdministratorAccess to your account to provision AWS resources for you like AppSync, Cognito etc. Once the user is created, Amplify CLI will ask you to provide the accessKeyId and the secretAccessKey to connect Amplify CLI with your newly created IAM user.

```
Enter the access key of the newly created user:
? accessKeyId:  # YOUR_ACCESS_KEY_ID
? secretAccessKey:  # YOUR_SECRET_ACCESS_KEY
This would update/create the AWS Profile in your local machine
? Profile Name:  # (default)

Successfully set up the new user.
```

## Initialising A New Project

```
amplify init
```

```
Enter a name for the project: __realtimepoll__
Enter a name for the environment: __dev__
Choose your default editor: __Visual Studio Code (or your default editor)__   
Please choose the type of app that you're building __javascript__   
What javascript framework are you using __react__   
Source Directory Path: __src__   
Distribution Directory Path: __build__   
Build Command: __npm run-script build__   
Start Command: __npm run-script start__   
Do you want to use an AWS profile? __Y__
Please choose the profile you want to use: __amplify__
```


Now, the AWS Amplify CLI has iniatilized a new project & you will see a new folder: __amplify__ & a new file called `aws-exports.js` in the __src__ directory. These files hold the project configuration.

To view the status of the amplify project at any time, you can run the Amplify `status` command:

```
amplify status
```

## Adding a GraphQL API

```sh
amplify add api

? Please select from one of the above mentioned services: GraphQL
? Provide API name: ConferenceAPI
? Choose an authorization type for the API: API key
? Enter a description for the API key: <some description>
? After how many days from now the API key should expire (1-365): 365
? Do you want to configure advanced settings for the GraphQL API: No
? Do you have an annotated GraphQL schema? N 
? Do you want a guided schema creation? Y
? What best describes your project: Single object with fields
? Do you want to edit the schema now? (Y/n) Y
```

When prompted, update the schema in the `amplify/backend/api/<api-name>/schema.graphql` to the following:   

```graphql
type Poll @model {
  id: ID!
  name: String!
  type: PollType!
  itemType: String
  createdAt: String
}

enum PollType {
  image
  text
}
```

The GraphQL schema will create a GraphQL type `Poll` with the following fields:

* id - a non-nullable field to store the id of the poll
* name - a non-nullable name of the poll
* type - type of poll options (candidates), resolving to an enum with values - `image` and `text`
* itemType - type of poll
* createdAt - the timestamp at which the poll was created

Run `amplify status` to check the status of the application. This will now reflect the addition of the API

Run `amplify push` to deploy the resources (API and DynamoDB tables) to the AWS cloud. Select appropriate options as shown below:

```
? Are you sure you want to continue? Yes
? Do you want to generate code for your newly created GraphQL API Yes
? Do you want to generate code for your newly created GraphQL API Yes
? Choose the code generation language target javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
```

The above command will provision the following resources on the AWS cloud:

1. DynamoDB table - `PollTable` - a table to store all the details about the polls created as a part of the application
2. AppSync API - a GraphQL API with pre-generated queries, mutations and subscriptions based on the graphql schema designed as mentioned above

The above command will return the GraphQL endpoint and the GraphQL API KEY as the response.

Run `amplify console` to view the application in the AWS console

## Understanding Queries, Mutations and Subscriptions

Amplify will auto generate queries, mutations and subscriptions for all the `@model` in the schema and can be viewed in the `/amplify/#current-cloud-backend/<api-name>/build/graphql.schema`

```graphql
type Poll {
  id: ID!
  name: String!
  type: PollType!
  itemType: String
  createdAt: String
  updatedAt: AWSDateTime!
}

enum PollType {
  image
  text
}

enum ModelSortDirection {
  ASC
  DESC
}

type ModelPollConnection {
  items: [Poll]
  nextToken: String
}

input ModelStringInput {
  ne: String
  eq: String
  le: String
  lt: String
  ge: String
  gt: String
  contains: String
  notContains: String
  between: [String]
  beginsWith: String
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
  size: ModelSizeInput
}

input ModelIDInput {
  ne: ID
  eq: ID
  le: ID
  lt: ID
  ge: ID
  gt: ID
  contains: ID
  notContains: ID
  between: [ID]
  beginsWith: ID
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
  size: ModelSizeInput
}

input ModelIntInput {
  ne: Int
  eq: Int
  le: Int
  lt: Int
  ge: Int
  gt: Int
  between: [Int]
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
}

input ModelFloatInput {
  ne: Float
  eq: Float
  le: Float
  lt: Float
  ge: Float
  gt: Float
  between: [Float]
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
}

input ModelBooleanInput {
  ne: Boolean
  eq: Boolean
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
}

input ModelSizeInput {
  ne: Int
  eq: Int
  le: Int
  lt: Int
  ge: Int
  gt: Int
  between: [Int]
}

input ModelPollTypeInput {
  eq: PollType
  ne: PollType
}

input ModelPollFilterInput {
  id: ModelIDInput
  name: ModelStringInput
  type: ModelPollTypeInput
  itemType: ModelStringInput
  createdAt: ModelStringInput
  and: [ModelPollFilterInput]
  or: [ModelPollFilterInput]
  not: ModelPollFilterInput
}

enum ModelAttributeTypes {
  binary
  binarySet
  bool
  list
  map
  number
  numberSet
  string
  stringSet
  _null
}

type Query {
  getPoll(id: ID!): Poll
  listPolls(filter: ModelPollFilterInput, limit: Int, nextToken: String): ModelPollConnection
}

input CreatePollInput {
  id: ID
  name: String!
  type: PollType!
  itemType: String
  createdAt: String
}

input UpdatePollInput {
  id: ID!
  name: String
  type: PollType
  itemType: String
  createdAt: String
}

input DeletePollInput {
  id: ID
}

type Mutation {
  createPoll(input: CreatePollInput!, condition: ModelPollConditionInput): Poll
  updatePoll(input: UpdatePollInput!, condition: ModelPollConditionInput): Poll
  deletePoll(input: DeletePollInput!, condition: ModelPollConditionInput): Poll
}

input ModelPollConditionInput {
  name: ModelStringInput
  type: ModelPollTypeInput
  itemType: ModelStringInput
  createdAt: ModelStringInput
  and: [ModelPollConditionInput]
  or: [ModelPollConditionInput]
  not: ModelPollConditionInput
}

type Subscription {
  onCreatePoll: Poll @aws_subscribe(mutations: ["createPoll"])
  onUpdatePoll: Poll @aws_subscribe(mutations: ["updatePoll"])
  onDeletePoll: Poll @aws_subscribe(mutations: ["deletePoll"])
}
```

Amplify automatically enables pagination, filtering capability for the get and list queries. You can understand more about the resolver mapping template utility reference (`$util`) [here](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-util-reference.html) 

## Understanding auto generated resolvers

Amplify also auto generates resolvers for all of the queries and mutations, and can be seen under the `/amplify/#current-cloud-backend/<api-name>/build/resolvers/` folder 

## Creating a new Poll

Run `amplify api console` to open the AppSync's `Queries` section in the AWS console. This can be used to run queries, mutations and subscriptions.

Execute the following query to get a list of all the polls:

```graphql
query GetAllPolls {
  listPolls {
    items {
      id
      name
      type
    }
  }
}
``` 

The above query will get the list of polls, but since there are no polls yet created, the response would be:

```graphql
{
  "data": {
    "listPolls": {
      "items": []
    }
  }
}
```

Run the following `mutation` to create your first poll

```graphql
mutation CreatePoll {
  createPoll(input: {
    id: "first-poll"
    name: "first-poll"
    type: text
    itemType: "Poll"
  }) {
    id
    name
    type
  }
}
``` 

Running the first `GetAllPolls` will now return the just created poll:

```graphql
{
  "data": {
    "listPolls": {
      "items": [
        {
          "id": "first-poll",
          "name": "first-poll",
          "type": "text",
          "itemType": "Poll",
          "createdAt": "2020-07-14T19:10:02.732Z"
        }
      ]
    }
  }
}
```

## Adding Candidates (Options) to the Poll

Now that you have created your first poll, lets add a few candidates (options) to our poll. To do so, you will have to first modify the GraphQL schema in the `/backend/api/schema.graphql` file

```graphql
type Poll @model {
  id: ID!
  name: String!
  type: PollType!
  itemType: String
  candidates: [Candidate] @connection
  createdAt: String
}

enum PollType {
  image
  text
}

type Candidate @model {
  id: ID!
  pollCandidatesId: ID
  image: String
  name: String
  upvotes: Int
}
```

The above schema signifies a one-to-many relationship between polls and candidates. The `@connection` directive enables you to specify relationships between @model types. Currently, this supports one-to-one, one-to-many, and many-to-one relationships. You may implement many-to-many relationships using two one-to-many connections and a joining `@model` type.

The above schema will create another DynamoDB table - `CandidateTable` with the following fields:

* id - candidate id
* pollCandidatesId - the poll id to which the candidate belongs to
* image - the image details if the poll is of type `image`
* name - name of the candidate if the poll is of type `text`
* upvotes - the number of upvotes for the particular candidate

Run `amplify api gql-compile` to make sure the schema details are added correctly and it compiles successfully

## Creating Poll and Candidates

Run `amplify status` to see that the API is now under `Update` status

!!! tip
    You can compile the GraphQL schema for any errors using the `amplify gql compile` command and view the compiled schema ouptput in `backend/api/<api-name>/build/schema.graphql` file

Run `amplify push` to push the latest changes to AWS cloud and select the appropriate options as below:

```
? Are you sure you want to continue? Yes
? Do you want to update code for your updated GraphQL API Yes
? Do you want to generate GraphQL statements (queries, mutations and subscription) based on your schema types?
This will overwrite your current graphql queries, mutations and subscriptions Yes
```

Once the command is successful, run `amplify console` to see the latest changes on the console. Navigate the DynamoDB service to see the newly created `CandidateTable` as well.

The above command will also generate the necessary resolvers for queries and mutations corresponding to the `Candidate` type

Get the poll `id` of the poll that was created earlier using the following query:

```graphql
query GetAllPolls {
  listPolls {
    items {
      id
    }
  }
}
```

use the above returned id in the `createCandidate` mutation and initialise the `upvotes` to `0`:

```graphql
mutation CreateCandidate {
  createCandidate(input: {
    pollCandidatesId: "first-poll"
    name: "first option"
    upvotes: 0
  }) {
    name
    upvotes
  }
}
```

Run the following `getPoll` query to get the poll details along with its candidates:

```graphql
query GetPoll {
  getPoll(id: "first-poll") {
    name
    type
    candidates {
      items {
        id
        name
        upvotes
      }
    }
  }
}
```

The above query should return the following response:

```JSON
{
  "data": {
    "getPoll": {
      "name": "first-poll",
      "type": "text",
      "candidates": {
        "items": [
          {
            "id": "70c5de2c-1b99-4cae-82c5-a2534212a87d",
            "name": "first option",
            "upvotes": 0
          }
        ]
      }
    }
  }
}
```

## Upvoting

1. To upvote a candidate for a poll, you will need to create a new mutation `upVote` and update the `schema.graphql` file as follows:

```graphql
type Poll @model {
  id: ID!
  name: String!
  type: PollType!
  itemType: String
  candidates: [Candidate] @connection
  createdAt: String
}

enum PollType {
  image
  text
}

type Candidate @model {
  id: ID!
  pollCandidatesId: ID
  image: String
  name: String
  upvotes: Int
}

type VoteType {
	id: ID
  clientId: ID
}

type Mutation {
  upVote(id: ID, clientId: ID): VoteType
}
```

2. Create a custom request resolver `Mutation.upVote.req.vtl` in the `/backend/api/<api-name>/resolvers` folder with the following definition:

```
{
    "version": "2018-05-29",
    "operation": "UpdateItem",
    "key" : {
      "id" : $util.dynamodb.toDynamoDBJson($context.arguments.id)
    },
    "update": {
      "expression" : "set #upvotes = #upvotes + :updateValue",
      "expressionNames" : {
           "#upvotes" : "upvotes"
       },
       "expressionValues" : {
           ":updateValue" : { "N" : "1" }
       }
    }
}
```

The above resolver will perform an atomic update on the `upvotes` key in the `CandidateTable` DynamoDB table. This atomic update allows the DynamoDB table to stay consistent regardless of the number of other operations that are happening

3. Create a `Mutation.upVote.res.vtl` response resolver in the same folder

```
$util.quiet($ctx.result.put("clientId", "$context.arguments.clientId"))
$util.toJson($ctx.result)
```

4. Update the resolver configuration in the `/backend/api/stacks/CustomResources.json` with the following details under the `Resources` section by replacing the `EmptyResource`:

```json
"UpvoteResolver": {
			"Type": "AWS::AppSync::Resolver",
			"Properties": {
				"ApiId": {
					"Ref": "AppSyncApiId"
				},
				"DataSourceName": "CandidateTable",
				"TypeName": "Mutation",
				"FieldName": "upVote",
				"RequestMappingTemplateS3Location": {
					"Fn::Sub": [
						"s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Mutation.upVote.req.vtl",
						{
							"S3DeploymentBucket": {
								"Ref": "S3DeploymentBucket"
							},
							"S3DeploymentRootKey": {
								"Ref": "S3DeploymentRootKey"
							}
						}
					]
				},
				"ResponseMappingTemplateS3Location": {
					"Fn::Sub": [
						"s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Mutation.upVote.res.vtl",
						{
							"S3DeploymentBucket": {
								"Ref": "S3DeploymentBucket"
							},
							"S3DeploymentRootKey": {
								"Ref": "S3DeploymentRootKey"
							}
						}
					]
				}
			}
		}
```

The `customResources.json` file is used to define any custom resources that needs to be added to the project

## Local mocking and testing

!!! caution
    Java is required on your development workstation to use Local Mocking in Amplify

One of the best features of Amplify is the capability to mock and test the setup locally without any configuration. It creates a mock DynamoDB database which can be used to store the mock and test data. 

To do so, just run the following command:

`amplify mock api`

This should start an AppSync Mock endpoint on `localhost` at port number `20002`. 

```sh
Creating new table PollTable
Creating new table CandidateTable
Running GraphQL codegen
✔ Generated GraphQL operations successfully and saved at src/graphql
AppSync Mock endpoint is running at http://192.168.1.9:20002
```

Open the endpoint in the browser to use the [GraphiQL](https://github.com/graphql/graphiql) Editor

Test the upVote feature by the following steps:
1. Create a new poll as mentioned earlier using the `createPoll` mutation
2. Create `Candidates` for the above created poll using the `createCandidate` mutation
3. Get the poll details using the following query:

```graphql
query GetPoll {
  getPoll(id: "first-poll") {
    candidates {
      items {
        id
        name
        pollCandidatesId
        upvotes
      }
    }
    name
  }
}
```

Notice the nesting of the query from `poll` to `candidates`
 
4. Up vote for the candidate using the `upVote` mutation:

```graphql
mutation UpVote {
  upVote(id: "688d4bc7-500f-4a68-9f11-4d34af05ca6a") {
    id
  }
}
```

The above mutation will increase the count of `upVote` by 1 and the same can be verified by using the `GetPoll` query mentioned in above

## Access patterns definition in DynamoDB

Working with DynamoDB requires a bit of forethought. DynamoDB query operations may use at most two attributes to efficiently query data. The first query argument passed to a query (the hash key) must use strict equality and the second attribute (the sort key) may use gt, ge, lt, le, eq, beginsWith, and between.

Understanding the various access patterns of your application becomes very crucial to design DynamoDB tables. In our current implication, you can query both the `Poll` and `Candidate` tables only using their respective ids, if you have query based on the type of the poll - `image`/`text`, it won't be possible. To achieve this, we can create a Global Secondary Index (GSI) on the Poll table with the `itemType` as the partition key (PK) and `createdAt` as the sort key (SK) - the combination of PK and SK should always be unique.

To create a GSI to the `Poll` type, we can modify the exisisting schema using the `@key` directive as follows:

```graphql
type Poll @model
  @key(name: "byItemType", fields: ["itemType", "createdAt"], queryField: "itemsByType")
  {
  id: ID!
  name: String!
  type: PollType!
  candidates: [Candidate] @connection
  itemType: String
  createdAt: String
}
```

The `@key` directive is used to define the indexes for the table. In the above example, we are creating a GSI with `itemType` as the partition key and `createdAt` as the sort key. The `queryField` defines the GraphQL query that will consume this GSI. 


## Adding subscriptions for real time updates

One of the most sort after features of GraphQL is real time data subscriptions and Amplify makes it so easy to do the same by just adding 3 lines of code to the GraphQL schema:

```graphql
type Subscription {
  onUpdateByID(id: ID!): VoteType
  @aws_subscribe(mutations: ["upVote"])
}
```

The above will add a new subscription that gets triggered when the `upVote` mutation publishes a result. The client is subscribed to a particular poll and will get notifications of any changes because of the `upVote` mutation

Push the changes using the `amplify push` command

## Testing GraphQL Subscriptions

You can test the GraphQL subscription in the AWS AppSync console. To open the console, run `amplify api console`, select `GrapgQL` and copy the following mutation to `upVote`:

```graphql
mutation UpVote {
  upVote(id: "688d4bc7-500f-4a68-9f11-4d34af05ca6a") {
    id
  }
}
```

Open another tab and copy the following subscription into the GraphiQL editor:

```graphql
mutation MyMutation {
  upVote(id: "688d4bc7-500f-4a68-9f11-4d34af05ca6a") {
    id
  }
}
```

!!! attention
    Don't have any other queries/mutations in the GraphiQL editor while testing for subscriptions. Always run the subscriptions in a different editor and make sure there are no other queries/mutations
    
Running the `upVote` mutation will see a subscription result on the second tab

## Integrating the GraphQL API with the UI code

Copy the following folders from this [git repo](https://github.com/SrushithR/realtime-polling-app) into your project folder:
1.  `src`
2.  `public`
3.  `package.json`
4.  `postcss.config.json`
5.  `tailwind.js`

To setup the UI project and get it up and running, run the following commands: 

1. `npm install` to install all the dependencies
2. `npm start` to start the project. The code will run on port `3000` and will you automatically be redirected to the web page. If not, hit `localhost:3000` on your browser

The home page automatically lists 5 polls that have been created sorted in ascending order. Clicking on "Create New Poll" will create a new poll along with its candidates 

### Create a new poll

You can now create a poll from the UI and provide two candidates, the candidates will automatically be initiased with 0 upvotes. Open the same poll link in another tab and start upvoting a candidate there and see the true magic of real time in the first tab, where the upvotes will start reflecting!! 

!!! success
    You have successfully created a real time polling application that can be used to create, and share polls and see the results in real time!
    
## Polls with image candidates

The poll type that we created had a type field which included two types - `text` and `image`. In the image type of polls, the end user can upload images as the candidates instead of just textual options. To do so, you will need to upload the images on to AWS and what better service than S3 to do so. 

To add storage to your application, run the following command:

```
amplify add storage
``` 

!!! info
    Adding storage requires 
    
and enter the following when prompted:

```
? Please select from one of the below mentioned services:
    `Content (Images, audio, video, etc.)`
? You need to add auth (Amazon Cognito) to your project in order to add storage for user files. Do you want to add auth now?
    `Yes`
? Do you want to use the default authentication and security configuration?
    `Default configuration`
? How do you want users to be able to sign in?
    `Username`
? Do you want to configure advanced settings?
    `No, I am done.`
? Please provide a friendly name for your resource that will be used to label this category in the project:
    `PollImages`
? Please provide bucket name:
    `storagebucketname`
? Who should have access:
    `Auth and guest users`
? What kind of access do you want for Authenticated users?
    `create/update, read, delete`
? What kind of access do you want for Guest users?
    `create/update, read, delete`
? Do you want to add a Lambda Trigger for your S3 Bucket?
    `No`
```

To push the changes to the cloud, run the command: 

```
amplify push
```

Once the update is complete, you will have an S3 bucket provisioned and the same will reflect as a folder `storage` in the project structure.

Now, you will be able to upload images from the application. The react code that you copied from the GitHub repo into the `src` folder already has image uploads configured

## Hosting your application

Now that you have built both the backend and the frontend, its time to show it to the world!

### Add app hosting

To add hosting to your application, run the following command:

```
amplify add hosting
```

This adds the hosting resources to the backend. The command will first prompt for environment selection, either DEV or PROD. Upon completion, the CloudFormation template for the resources is placed in the amplify/backend/hosting directory.

```
? Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type Continuous deployment (Git-based deployments)
? Continuous deployment is configured in the Amplify Console. Please hit enter once you connect your repository
```
The second option will deploy your frontend code to an S3 bucket and automatically configure web hosting for you!
 
## Destroy the App

!!! danger

Although, the entire application uses services that have free tier, it is advisable to destroy the stack if not being consumed and to do so, run the following command:

```
amplify delete
```

