## Loan Application code challenge

# Task:
The goal of the project is to build a simple business loan application system.

The system consists of the following:

Frontend
Backend
The backend would integrate with third-party providers such as:

Decision engine - This is where the final application will be submitted to present the outcome of the application.
Accounting software providers will provide a balance sheet for a selected business of the user.

Assumptions:

You may choose from the following language: Javascript, Typescript, Python, Golang / HTML, CSS.
For frontend, you could use a framework such as React / Vue, though basic HTML is also acceptable.
The accounting software and decision engine are already implemented. The backend should provide a simulation of the above.
The frontend can be very basic.
The accounting provider option on frontend would include Xero, MYOB and more in future.
A sample balance sheet received from Accounting provider:

Review:

Develop Endpoint with GraphQL to read the json file with streaming classes
The API should be able to fetch reviews based on one the input query parameters. (non-case sensitive).

## Backend API services are divided in to 5 micro-services. 

* Application Service API - main endpoint to communicate with all other services
* Accounting Service API - to use for return reports according to selected software account and can be implement more software types
* User Service API - to communicate with all users
* Decision Service API - to communicate with all business logic
* Review Service API - to return all the reviews 

## Protocol methods

* Application Service API - REST API
* Accounting Service API - REST API
* User Service API - REST API
* Decision Service API - REST API
* Review Service API - GraphQL

## API Gateway
* Gateway Service API - to forward http request response,  will use cloud service in production level
  (API Gateway working for different protocol methods Ex: Rest and GraphQL)

Application Service API and User Service API use .env file to connect with cloud database, will remove it further in production level

## Frontend 

simple react app context API state management

## Port Numbers

* Frontend run on - localhost:2999
* Gateway Service API run on - localhost:3000
* Application Service API run on - localhost:3001
* User Service API run on - localhost:3002
* Accounting Service API run on - localhost:3003
* Decision Service API run on - localhost:3004
* Review Service API run on - localhost:3005

this static port numbers will move for cloud config server file in production level

### How to run locally

```bash
# to run the web app (make sure to run npm install beforehand)


cd frontend
npm start 

# to run the gateway (local only)
cd gateway
npm start

# to run application api

# application-service-api
cd application-service-api
npx prisma generate 
npm start

#user-service-api
cd user-service-api
npx prisma generate
npm start

# accounting-service-api
cd accounting-service-api
npm start

# decision-service-api
cd decision-service-api
npm start

# review-service-api
cd review-service-api
npm start

## docker run
# !important - gateway docker-registry.json file updated for communicating between different docker services in docker-compose, if need to run in docker, should change local-registry.json file to docker-registry.json
# const registry = require('./docker-registry.json')
docker compose up

```
```bash
# to test 
# only test business logic yet, can be implement more test further for cover more edge cases
cd decision-service-api
npm run test
```

### Folder structure

```bash
├── backend
│   ├── accounting-service-api          // to fetch mock data
│   ├── application-service-api         // to manange all services
│   ├── decision-service-api            // to business logic
│   ├── gateway                         // to manange request and response
│   └── user-service-api                // to manage user service
|   └── review-service-api		        // to check reviews
└── frontend
    ├── public
    └── src


