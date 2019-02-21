[dependency]: https://david-dm.org/Answart/next-store?path=server
[snyk]: https://snyk.io/test/github/Answart/next-store

# Next Store server-side

[![dependencies Status](https://david-dm.org/Answart/next-store/status.svg?path=server)][dependency]
[![Known Vulnerabilities](https://snyk.io/test/github/Answart/next-store/badge.svg?targetFile=server/package.json)][snyk]

An Express GraphQL server app using [GraphQL Yoga](https://oss.prisma.io/content/graphql-yoga/01-overview/) and [Prisma](https://www.prisma.io/) that serves as the server to Next Store.

Tech Stack and Key Packages
---------------------------

* [GraphQL](https://graphql.org/): Query language for APIs
* [GraphQL Yoga](https://oss.prisma.io/content/graphql-yoga/01-overview/): Express GraphQL server
* [Prisma](https://www.prisma.io/): GraphQL database interface
* [Bcryptjs](https://github.com/dcodeIO/bcrypt.js/): Password hashing
* [JSON Web Token](https://www.jsonwebtoken.io/): User authentication
* [MailTrap](https://mailtrap.io/): Development emailing
* [Postmark](https://postmarkapp.com/): Production emailing
* [nodemailer](https://nodemailer.com/about/): Sending email with NodeJS
* [Stripe](https://stripe.com/): E-commerce API

Getting Started
---------------

Create an **.env** file:
```bash
# ./server/.env
NODE_ENV=development
APP_SECRET=<SECRET-STRING-OF-YOUR-CHOICE>
HOST=http://localhost
PORT=4242
DEV_CLIENT_URL=http://localhost:7272
PROD_CLIENT_URL=<HEROKU-CLIENT-APP-URL>
PROD_SERVER_URL=<HEROKU-SERVER-APP-URL>
CLOUDINARY_API_KEY=<CLOUDINARY-API-KEY>
CLOUDINARY_PRESET=nextstore
CLOUDINARY_SECRET=<CLOUDINARY-SECRET-STRING>
PRISMA_DEV_ENDPOINT=https://<PRISMA-DEV-SERVER>.sh/<PRISMA-WORKSPACE>/<PRISMA-DEV-SERVICE>/dev
PRISMA_PROD_ENDPOINT=https://<PRISMA-PROD-SERVER>.herokuapp.com/<PRISMA-PROD-SERVICE>/prod
PRISMA_SECRET=<SECRET-PRISMA-STRING-OF-YOUR-CHOICE>
STRIPE_SECRET=<STRIPE-SECRET-STRING>
MAILTRAP_HOST=<MAILTRAP-HOST-NAME>
MAILTRAP_PORT=<MAILTRAP-PORT-NUMBER>
MAILTRAP_USER=<MAILTRAP-USER>
MAILTRAP_PASS=<MAILTRAP-PASSWORD>
POSTMARK_HOST=<POSTMARK-HOST-NAME>
POSTMARK_PORT=<POSTMARK-PORT-NUMBER>
POSTMARK_USER=<POSTMARK-USER>
POSTMARK_PASS=<POSTMARK-PASSWORD>
```

Launch server in new tab:
```bash
# ./server/
$ npm install
$ npm run start:dev
```

View server at [**localhost:4242**](http://localhost:4242).

NPM Commands
------------

| Command | Description |
|---------|-------------|
| npm install | Install dependencies |
| npm run deploy | Deploy changes to Prisma server |
| npm run start:dev | Launch server |
