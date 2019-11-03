# doer-backend

API for [doer](https://github.com/Danondso/doer), base implementation generated using [generator-express-no-stress](https://github.com/cdimascio/generator-express-no-stress).

**NOTE:** There's zero react code in here, the repo was named erroneously at the start and as development progressed the tech stack changed.

## Get Started

Make sure you have the following setup:

- A mongodb instance
- Okta Authorization Server (I'm sure this can be changed out but the service leverages libraries specific to okta)
- Okta SPA Client ID

Get started developing...

```shell
# install dependencies
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Configuring .env File

This service is secured via oauth using Okta as the identity provider.

The base .env file will look similar to this:

```env
APP_ID=doer-backend
PORT=3000
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=mySecret # Default from the original service generation

#MongoDB
MONGODB_CONNECTION_STRING= # MongoDB connection string

#Swagger
SWAGGER_API_SPEC=/spec #Base Spec path

#Secret Key
ISSUER= # Okta Issuer URL
SPA_CLIENT_ID= # Okta SPA client ID
OKTA_TESTING_DISABLEHTTPSCHECK=false # For local development
AUDIENCE= # Authorization Server Audience
```

## Run It

### Run in *development mode*

Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production mode*

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It

Open you're browser and navigate to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) to view the open api spec.

Something to note, the swagger api spec isn't playing well with token retrieval, so I suggest looking into trying the api using an http client instead.

## Debug It

### Debug the Server

```terminal
npm run dev:debug
```

#### Debug Tests

```terminal
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file

## Lint It

View prettier linter output

```terminal
npm run lint
```

Fix all prettier linter errors

```terminal
npm run lint
```

## Deploy It

Choose your flavor of deployment, this was a personal project so there's no specified deployment plan.