## Loan Application

## Backend API services are divided in to 4 micro-services. 

* Application Service API - main endpoint to communicate with all other services
* Accounting Service API - to use for return reports according to selected software account and can be implement more software types
* User Service API - to communicate with all users
* Decision Service API - to communicate with all business logic

## API Gateway
* Gateway Service API - to forward http request response,  will use cloud service in production level

Application Service API and User Service API use .env file to connect with cloud database, will remove it further in production level

## Frontend 

simple react app 

## Port Numbers

* Frontend run on - localhost:2999
* Gateway Service API run on - localhost:3000
* Application Service API run on - localhost:3001
* User Service API run on - localhost:3002
* Accounting Service API run on - localhost:3003
* Decision Service API run on - localhost:3004

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
│   ├── accounting-service-api          // to fetch mock data
│   ├── application-service-api         // to manange all services
│   ├── decision-service-api            // to business logic
│   ├── gateway                         // to manange request and response
│   └── user-service-api                // to manage user service
└── frontend
    ├── public
    └── src

```