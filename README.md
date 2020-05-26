# Not Busy App - API

Not Busy App is the API for the web-based solution for patrons to find the least busy businesses in their area. The api is running at https://maxgardiner.xyz and the app itself is currently running on a firebase instance at: https://not-busy-front.web.app/ 

## Purpose

Since COVID-19 :microbe: we citizens have struggled with the balance of social distance and fulfilment of basic needs. For some who are at special risk, this pandemic has been a nightmare to collect basic necessities for daily life. I wanted to make a proof-of-concept for an app which can be used to help citizens find the least busy businesses to patronize. 

## Description

Not Busy App API is a stateless NodeJS/Express API to complete the MEAN stack used by the Not Busy App suite. This API defines a series of routes protected and parsed by middlewares to be queried and updated with details related to authenticated users, local businesses and their relative popularity, and user interactions with said places.

## Installation

You must have the npm (~6.14) and node (~10.20) installed. See instructions here for OS X, Windows, and Linux: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm .

*Temporary*: You must also have python3 and pip3 installed, and use pip3 to install the required package (This package is included for the purpose of Proof of Concept, see note regarding this package in "Other Considerations"). Run the following commands after installing python3 and pip3:
```
$ pip3 install --upgrade git+https://github.com/m-wrzr/populartimes
```

*Temporary*: As a proof of concept we are using Google libraries to get some of this data preliminarily. You will require an API key from the Google Console for the "Places API": https://console.developers.google.com/google/maps-apis/apis/places-backend.googleapis.com/metrics

Once you have a Google API key you can create a file in the root directory of this project called: *dev.env.ts* with the following data:
```

export const environment = {
    "jwt_secret": "{{random key}}",
    "google_places_api_key": {{Place your GOOGLE_API_KEY here}},
    "testing_user_email":"test123456@email.com",
    "testing_user_password":"iMNSjsUUap",
    "testing_user_name":"Johnny Appleseed",
    "testing_location": {
        "lat": "40.785091",
        "lng": "-73.968285"
    },
    
}

```

Then you can go into the root directory to install the required dependencies. To do this, run:
```
$ npm i
```
You can use your global installation of node to run the app locally with:
```
$ npm run start
```

your local version of the API will be running on port 3000.


## Testing

Run the following to run all unit tests:
```
$ npm run test
```

## Deployment

See angular best practices for deployment/production build details here: https://expressjs.com/en/advanced/best-practice-performance.html. In order to run the app outside of a local dev server you will need an ssl-encrypted server to host this API or else most modern browsers will not allow requests from an encrypted web page.

## App Structure
 
Similarly to the front-end it helps with app complexity when growing to have a highly modularized project structure from the get-go. 

The basic modules are for authentication, user data, place data, and shared services among each of those modules. 

For all the services who revolve around managing a single shared resource we implement a singleton design pattern (places service instide the routes for example) because having multiple instances accessing a shared resource like this could be potentially destructive.

I implement a DAO (Data Access Object) for each resource which interacts directly with data. This is meant to abstact the retrieval of data from the resource containing the data (https://www.oracle.com/java/technologies/dataaccessobject.html). 

Each module contains 0 or more of the following:
- controllers (for handling the proper client requests that passed middleware validation/parsing)
- middlewares (for all the methods for validation of a route and its params and other uses before reaching controller)
- services (methods for accessing the DAOs (or other) by use in controllers and middleware)
- daos (for defining access to the data)
- route config (each module defines it's own routes)


 ```
└───app/
    ├───auth/
    │   ├───controllers/
    │   │   └───auth.controller.ts
    │   ├───middlewares/
    │   │   ├───auth.middleware.ts
    │   │   └───jwt.middleware.ts
    │   ├───services/
    │   │   └───jwt.service.ts
    │   └───auth.routes.config.ts
    ├───common/
    │   ├───interfaces/
    │   │   └───location.interface.ts
    │   ├───middlewares/
    │   │   └───common.permission.middleware.ts
    │   ├───services/
    │   │   ├───google.places.service.ts
    │   │   └───mongoose.service.ts
    │   └───common.routes.config.ts
    ├───places/
    │   ├───controllers/
    │   │   ├───place.interface.ts
    │   │   └───places.controllers.ts
    │   ├───daos/
    │   │   ├───places.dao.ts
    │   │   └───popularity.dao.ts
    │   ├───middlewares/
    │   │   └───places.middleware.ts
    │   ├───services/
    │   │   └───places.service.ts
    │   └───places.routes.config.ts
    ├───users/
    │   ├───controllers/
    │   │   └───users.controller.ts
    │   ├───daos/
    │   │   └───users.dao.ts
    │   ├───middlewares/
    │   │   └───users.middleware.ts
    │   ├───services/
    │   │   └───user.services.ts
    │   └───users.routes.config.ts
    └───app.ts
 ```
## Dev History

This app was originally a one week coding challenge I made for myself to complete the full stack of an app that would aide the community during the pandemic. It was originally made as an attempt to sharpen my skills that I have been honing on the front-end, while giving me some reminders of Node/Express best practices developing an API on the back end.

## Other considerations

- The python script used to gather the preliminary data for business popularity is technically against a certain TOS used to gather the data. For this reason this app will not be used in a production capacity until this requirement is removed. The idea past this POC is to have businesses and customers opt-in to providing the relevent data, which will forgo the need for the scraping
- This app is just a proof-of-concept to be presented as an idea in the meantime. If I continue to create some more functionality and finish up the final basic components I will consider making this a real open source project.  I will gladly accept any ideas or issues in the issue tracker, or PRs if anyone is really interested.
- Many people before COVID-19 would go to specific businesses with little provocation to do so. This app assumes that many patron-business loyalties have fallen by the wayside with availability.
- I used the following app as a starting point for this app's structure to help tie my understanding of BP with a new project: https://github.com/makinhs/expressjs-api-tutorial/tree/001-criando-o-projeto thank you

## Under Development
 
- [X] SSL on AWS instance running this API
- [X] Get places by user favourites + unit tests for this
- [ ] Automate python script setup until a final solution is implemented for gathering/storing place data.
- [ ] Make new users basic-level permission
- [ ] Unit tests for user favourites (get favourites, update favourites, remove favourite)


## Future Considerations
- Package the entire app into a docker instance (or other container platform)
- Email verification/Forgot password
- Use one of the auth levels for beta testers and define the signup of a beta tester

## Author

Max Gardiner
https://github.com/max-in-to

## License

None (All rights are reserved to author)


