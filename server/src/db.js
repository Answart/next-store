// This file connects to the remote prisma DB and gives the ability to query it with JS
const { Prisma } = require('prisma-binding');
const endpoint = (process.env.NODE_ENV == 'production')
  ? process.env.PRISMA_PROD_ENDPOINT
  : process.env.PRISMA_DEV_ENDPOINT;

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint,
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

module.exports = db;
