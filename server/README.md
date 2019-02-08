[dependency]: https://david-dm.org/Answart/next-store?path=server
[synk]: https://app.snyk.io/org/answart/project/16c70d47-eeaa-4f4b-8a80-c2aa0e6b98e1

# Next Store server-side

[![dependencies Status](https://david-dm.org/Answart/next-store/status.svg?path=server)][dependency]
[![Known Vulnerabilities](https://snyk.io/test/github/Answart/next-store/badge.svg)][synk]

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
APP_SECRET=<SECRETSTRINGOFYOURCHOICE>
PORT=4242
CLIENT_URL=http://localhost:7272
CLOUDINARY_API_KEY=<CLOUDINARYAPIKEY>
CLOUDINARY_PRESET=nextstore
CLOUDINARY_SECRET=<CLOUDINARYSECRETSTRING>
PRISMA_DEV_ENDPOINT=https://<PRISMADEVSERVER>.sh/<PRISMAWORKSPACE>/<PRISMADEVSERVICE>/dev
PRISMA_PROD_ENDPOINT=https://<PRISMAPRODSERVER>.herokuapp.com/<PRISMAPRODSERVICE>/prod
PRISMA_SECRET=<SECRETPRISMASTRINGOFYOURCHOICE>
STRIPE_SECRET=<STRIPESECRETSTRING>
MAILTRAP_HOST=<MAILTRAPHOSTNAME>
MAILTRAP_PORT=<MAILTRAPPORTNUMBER>
MAILTRAP_USER=<MAILTRAPUSER>
MAILTRAP_PASS=<MAILTRAPPASSWORD>
POSTMARK_HOST=<POSTMARKHOSTNAME>
POSTMARK_PORT=<POSTMARKPORTNUMBER>
POSTMARK_USER=<POSTMARKUSER>
POSTMARK_PASS=<POSTMARKPASSWORD>
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
| npm run start:dev | Launch server |
