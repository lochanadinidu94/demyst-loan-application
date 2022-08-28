## Loan Application

Backend API services are divided in to 4 micro-services. 

* Application Service API - main endpoint to communicate with all other services
* Accounting Service API - to use for return reports according to selected software account and can be implement more software types
* User Service API - to communicate with all users
* Decision Service API - to communicate with all business logic

* Gateway Service API - to forward http request response,  will use cloud service in production level

Application Service API and User Service API use .env file to connect with cloud database, will remove it further in production level

Frontend 

simple react app 

### How to run locally

```bash
# to run the web app (make sure to run npm install beforehand)
cd frontend
npm start 

# to run the gateway (local only)
cd gateway
npm start

# to run application api

# accounting-service-api
cd accounting-service-api
nest run

# application-service-api
cd application-service-api
nest run

# decision-service-api
cd decision-service-api
nest run

#user-service-api
cd user-service-api
nest run

```
```bash
# to test 
# only test business logic yet, can be implement more test further for cover more edge cases
cd cd decision-service-api
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