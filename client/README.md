[dependency]: https://david-dm.org/Answart/next-store?path=client
[snyk]: https://snyk.io/test/github/Answart/next-store
[coveralls]: https://coveralls.io/github/Answart/next-store?branch=master

# Next Store client-side

[![dependencies Status](https://david-dm.org/Answart/next-store/status.svg?path=client)][dependency]
[![Known Vulnerabilities](https://snyk.io/test/github/Answart/next-store/badge.svg?targetFile=client/package.json)][snyk]
[![Coverage Status](https://coveralls.io/repos/github/Answart/next-store/badge.svg?branch=master)][coveralls]

A React app that uses [Next.js](https://nextjs.org/), [Apollo](https://www.apollographql.com/), and [Styled-Components](https://www.styled-components.com/) that serves as the client for Next Store.

Tech Stack and Key Packages
---------------------------

* [React](https://reactjs.org/): Javascript Framework
* [Next.js](https://nextjs.org/): React Framework for server side rendering/routing/tooling
* [Apollo](https://www.apollographql.com/): GraphQL Framework for Data Management
* [Styled-Components](https://www.styled-components.com/): CSS for styling React component systems
* [Jest](https://facebook.github.io/jest/): Javascript testing
* [Enzyme](https://github.com/airbnb/enzyme): React testing utility
* [Cloudinary](https://cloudinary.com/): Image hosting API

Getting Started
---------------

#### Install dependencies
```bash
# ./client/
$ npm install
```

Update config file variables with the environment variables set in **./server/.env** with the same name.
```bash
# ./client/config.js
# ...
export const PROD_SERVER_URL = 'PUTHERE';
export const CLOUDINARY_API_KEY = 'PUTHERE';
export const CLOUDINARY_PRESET = 'PUTHERE';
export const CLOUDINARY_SECRET = 'PUTHERE';
export const STRIPE_API_KEY = 'PUBLISHABLE-KEY-FROM-STRIPE';
# ...
```

Launch client in new tab:
```bash
$ npm run start:dev
```

View client at [**localhost:7272**](http://localhost:7272) in browser.

NPM Commands
------------

| Command | Description |
|---------|-------------|
| npm install | Install dependencies |
| npm run build | Build production deployment files |
| npm run start:dev | Launch client |
