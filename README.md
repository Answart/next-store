# Next Store

A fullstack React store app where a user can browse among items with which they can buy or sell. It uses React's Next.js framework and GraphQL's Apollo framework.

User stories
------------

* As an unauthenticated user, I can create an account or log in.
* As an unauthenticated or authenticated user, I can see and search for items in store.
* As an authenticated user, I can add/remove items from cart and come back later to access them.
* As an authenticated user, I can delete items from cart that I decide I don't want anymore.
* As an authenticated user, I can use a credit card to buy items in cart.
* As an authenticated user, I can submit items I want to sell through the store.
* As an authenticated user, I can view past orders.

Tech Stack and Key Packages
---------------------------

### Server Side

* [GraphQL](https://graphql.org/): Query language for APIs
* [GraphQL Yoga](https://oss.prisma.io/content/graphql-yoga/01-overview/): Express GraphQL server
* [Prisma](https://www.prisma.io/): GraphQL database interface
* [Bcryptjs](https://github.com/dcodeIO/bcrypt.js/): Password hashing
* [JSON Web Token](https://www.jsonwebtoken.io/): User authentication
* [MailTrap](https://mailtrap.io/): Development emailing
* [Postmark](https://postmarkapp.com/): Production emailing
* [nodemailer](https://nodemailer.com/about/): Sending email with NodeJS
* [Stripe](https://stripe.com/): E-commerce API

### Client Side

* [React](https://reactjs.org/): Javascript Framework
* [Next.js](https://nextjs.org/): React Framework for server side rendering/routing/tooling
* [Apollo](https://www.apollographql.com/): GraphQL Framework for Data Management
* [Styled-Components](https://www.styled-components.com/): CSS for styling React component systems
* [Jest](https://facebook.github.io/jest/): Javascript testing
* [Enzyme](https://github.com/airbnb/enzyme): React testing utility

App Map
-------

```
server/
    varables.env        Server side environment variables
    .graphqlconfig.yml  GraphQL config file
    prisma.yml          Prisma config file
    datamodel.graphql   Type definitions for server querying generated by prisma
    src/                
        server.js             GraphQL Yoga server
        db.js                 Prisma DB connection and querying
        index.js              Server root which starts node server
        mail.js               Mailtrap integration through nodemailer and Email Templates
        schema.graphql        GraphQL schema with type definitions for client facing calls
        stripe.js             Stripe API connection
        utils.js              Utility files
        generated/            Generated files from Prisma
            prisma.graphql          Generated Prisma schema with type definitions
        resolvers/            Files for how server works with incoming/outgoing data
            Mutation.js             Config file for updating server data
            Query.js                Config file for receiving server data
client/
    config.js           Client side config
    jest.setup.js       File setup React Jest and to configure Enzyme into Jest
    __test__/           Test files for pages and components
    lib/                Files for utility and testing
        withData.js           Apollo client setup
    static/             Assets like logo, fonts, or extra css
    components/         Component files called by pages and styles folder
        styles/               CSS for components using the styled-components package
    pages/              App page files
        _app.js               App root for navigating pages and persisting state between page changes
        _document.js          File to implement server side rendering for css-in-js libraries
        index.js              Home page
        item.js               Singular product page
        items.js              Catalog page
        order.js              Current order page
        orders.js             Order history page
        permissions.js        Permissions page
        reset.js              Reset password page
        sell.js               Submit item to sell page
        signup.js             Signup page
        update.js             Update account page
```

Getting Started
---------------

```bash
# Install NPM dependencies
$ cd client;npm install;cd ../server;npm install;cd ..;

#Create a variables.env file in server directory that has the following:
CLIENT_URL="http://localhost:7777"
PRISMA_ENDPOING="https://us1.prisma.sh/<ACCOUNTNAME>/<DBNAME>/dev"
PRISMA_SECRET="<PRISMASECRETSTRING>"
APP_SECRET="<SECRETSTRINGOFYOURCHOICE>"
STRIPE_SECRET="<STRIPESECRETSTRING"
PORT=4444
MAIL_HOST="<MAILTRAPHOSTNAME>"
MAIL_PORT="<MAILTRAPPORTNUMBER>"
MAIL_USER="<MAILTRAPUSER>"
MAIL_PASS="<MAILTRAPPASSWORD>"

# Start the app locally by running the server and client side apps
$ cd server
$ npm run dev
# Open a new tab in the project directory
$ cd client
$ npm run dev
# Go to localhost:7777 in browser
```

NPM Commands for Client and Server directories
------------

|Command|Description|
|---|---|
|npm run dev|Start webpack development server @ **localhost:7777**|
|npm run build|Build production bundles to **./build** directory|
|npm start|Start development server @ **localhost:7777**|
|npm run test|Run tests on all .test. files.|
