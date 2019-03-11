[dependency]: https://david-dm.org/Answart/next-store?path=server
[snyk]: https://snyk.io/test/github/Answart/next-store

# Next Store server-side

[![dependencies Status](https://david-dm.org/Answart/next-store/status.svg?path=server)][dependency]
[![Known Vulnerabilities](https://snyk.io/test/github/Answart/next-store/badge.svg?targetFile=server/package.json)][snyk]

An **Express GraphQL** server app using [**GraphQL Yoga**](https://oss.prisma.io/content/graphql-yoga/01-overview/) and [**Prisma**](https://www.prisma.io/) that serves as the server to Next Store.

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

#### Install dependencies

```bash
# ./server/
$ npm install
```

#### Create .env file

Create an **.env** file which will be updated during setup. See also **.env_example**.
```bash
# ./server/.env
NODE_ENV=development
APP_SECRET=my-super-secret
HOST=http://localhost
PORT=4242
DEV_CLIENT_URL=http://localhost:7272
PROD_CLIENT_URL=
PROD_SERVER_URL=
CLOUDINARY_API_KEY=
CLOUDINARY_PRESET=nextstore
CLOUDINARY_SECRET=
PRISMA_DEV_ENDPOINT=
PRISMA_PROD_ENDPOINT=
PRISMA_SECRET=
PRISMA_MANAGEMENT_API_SECRET=
STRIPE_SECRET=
MAILTRAP_HOST=
MAILTRAP_PORT=
MAILTRAP_USER=
MAILTRAP_PASS=
POSTMARK_HOST=
POSTMARK_PORT=
POSTMARK_USER=
POSTMARK_PASS=
```

#### Setup Cloudinary

1. Create and access your [**Cloudinary**](https://cloudinary.com/) account.
2. Grab your API key (**CLOUDINARY_API_KEY**) and API secret (**CLOUDINARY_SECRET**) from the [main console page](
https://cloudinary.com/console).
3. Create a [folder](https://cloudinary.com/console/media_library/folders/all/) where uploads will be stored.
4. Add an [upload preset](https://cloudinary.com/console/settings/upload) to set the dimensions uploaded files will be transformed into. (**CLOUDINARY_PRESET**)

#### Setup MailTrap

1. Create or access your [**MailTrap**](https://mailtrap.io/) account.
2. Create a demo inbox and check the SMTP Settings page for the Host, Port, Username, and Password credentials to be used in your env file.(**MAILTRAP_HOST**, **MAILTRAP_PORT**, **MAILTRAP_USER**, **MAILTRAP_PASS**)

(Postmark setup is unnecessary for local)

#### Setup Prisma

1. Create or access your [**Prisma**](https://app.prisma.io/) account.
2. Globally install prisma then login to prisma in the terminal.
```bash
# ./server/
$ npm install -g prisma
$ prisma login
```
3. [Set up Prisma](https://www.prisma.io/docs/1.26/get-started/01-setting-up-prisma-demo-server-JAVASCRIPT-a001/) by using the [prisma-cli](https://github.com/prisma/prisma) in the terminal to generate your endpoint.

```bash
# ./server/
$ prisma init
# ? Set up a new Prisma server or deploy to an existing server?
> Demo server
# ? Choose the region of your demo server
# (for me it was 'answart/demo-us1')
> PRISMA-WORKSPACE/PRISMA-SERVER
# ? Choose a name for your service
> next-store-dev
# ? Choose a name for your stage (dev)
> dev
# ? Select the programming language for the generated Prisma client
> Don\'t generate
```
It will generate the files **datamodel.graphql** and **prisma.yml**.

4. Place the endpoint url from the generated **prisma.yml** as the **PRISMA_DEV_ENDPOINT** in your .env file. Delete the generated files as the endpoint is now in the .env file and generated files are already configured in the prisma directory.

5. Run the deploy script. Any changes from this point on can be deployed with the following script:

```bash
$ npm run deploy:dev
```

#### Setup Stripe

1. Create or access your [**Stripe**](https://stripe.com/) account. (Confirm your account in your email if creating an account)
2. Click the [API keys](https://dashboard.stripe.com/account/apikeys) link under the Developers tab.
3. Grab the **Publishable Key** and update STRIPE_API_KEY on the **CLIENT SIDE** with this key (aka **./client/config.js**)
4. Grab the **Secret key** and update STRIPE_SECRET in the .env file on the **SERVER SIDE** (aka **./server/.env**)

#### Launch server

```bash
# ./server/
$ npm run start:dev
```

View server at [**localhost:4242**](http://localhost:4242).

NPM Commands
------------

| Command | Description |
|---------|-------------|
| npm install | Install dependencies |
| npm run deploy:dev | Deploy changes to Prisma server |
| npm run start:dev | Launch server app at [**localhost:4242**](http://localhost:4242) |
