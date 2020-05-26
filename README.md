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

## Deployment

See angular best practices for deployment/production build details here: https://expressjs.com/en/advanced/best-practice-performance.html. In order to run the app outside of a local dev server you will need an ssl-encrypted server to host this API or else most modern browsers will not allow requests from an encrypted web page.

## App Structure

Highly modularized with lazy-loaded page components. All shared components reside in the "shared" folder (components, services, interfaces, and directives used by more than one component). A module is a mechanism to group the aforemention pieces into a working application. The basic structure of a module is defined by the module file and can include definitions/exports of components to be used elsewhere, or imports of other modules to use their pieces inside of this component.

```

└───src/
    ├───app/
    │   ├───{{function_grouping}}/
    │   │   ├───{{component_def}}/
    │   │   │   ├───components/
    │   │   │   ├───services/
    │   │   │   ├───resolvers/
    │   │   │   └───directives/
    |   |   └───{{function_grouping}}.module.ts
    │   ├───shared/
    │   │   ├───components/
    │   │   │   └───shared-header/
    │   │   │       ├───shared-header.component.html
    │   │   │       ├───shared-header.component.scss
    │   │   │       ├───shared-header.component.spec.ts
    │   │   │       └───shared-header.component.ts
    │   │   ├───directives/
    │   │   │   ├───no-request-page.directive.spec.ts
    │   │   │   └───no-request-page.directive.ts
    │   │   ├───interfaces/
    │   │   │   ├───lat-lng.interface.ts
    │   │   │   ├───place.interface.ts
    │   │   │   └───user.interface.ts
    │   │   ├───services/
    │   │   │   ├───base-api.service.spec.ts
    │   │   │   ├───base-api.service.ts
    │   │   │   ├───http-service.interceptor.spec.ts
    │   │   │   ├───http-service.interceptor.ts     --> Created this interceptor to help with the initial custom splash and detect the first http request completing before hiding the splash
    │   │   │   ├───location.service.spec.ts
    │   │   │   └───location.service.ts
    │   │   └───shared.module.ts    --> Modules used (and will be used) by components throughout the app
    │   ├───app-routing.module.ts   --> Base routing defined here
    │   ├───app.component.html      --> Root template
    │   ├───app.component.scss
    │   ├───app.component.spec.ts
    │   ├───app.component.ts
    │   └───app.module.ts   --> Global module definitions/imports
    ├───index.html      --> App root
    └───styles.scss     --> Global styles

```
## Dev History

This app was originally a one week coding challenge I made for myself to complete the full stack of an app that would aide the community during the pandemic. It was originally made as an attempt to sharpen my skills that I have been honing on the front-end, while giving me some reminders of Node/Express best practices developing an API on the back end.

## Other considerations

- The python script used to gather the preliminary data for business popularity is technically against a certain TOS used to gather the data. For this reason this app will not be used in a production capacity until this requirement is removed. The idea past this POC is to have businesses and customers opt-in to providing the relevent data, which will forgo the need for the scraping
- This app is just a proof-of-concept to be presented as an idea in the meantime. If I continue to create some more functionality and finish up the final basic components I will consider making this a real open source project.  I will gladly accept any ideas or issues in the issue tracker, or PRs if anyone is really interested.
- Many people before COVID-19 would go to specific businesses with little provocation to do so. This app assumes that many patron-business loyalties have fallen by the wayside with availability.

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

