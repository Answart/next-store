require('dotenv').config({ path: '.env' });

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');

const node_env = process.env.NODE_ENV;
const endpoint = (node_env == 'production')
  ? process.env.PRISMA_PROD_ENDPOINT
  : process.env.PRISMA_DEV_ENDPOINT;
const clientUrl = (node_env == 'production')
  ? process.env.PROD_CLIENT_URL
  : process.env.DEV_CLIENT_URL;
const serverUrl = (node_env == 'development')
  ? `${process.env.HOST}:${process.env.PORT}`
  : process.env.PROD_SERVER_URL;


const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint,
  secret: process.env.PRISMA_SECRET,
  debug: (node_env == 'development')
    ? true
    : false,
});

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({ ...req, db })
});

server.express.use(cookieParser());

// middleware to set userId on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    req.userId = userId;
  }

  next();
});

// middleware to set user on each request
server.express.use(async (req, res, next) => {
  if (!req.userId) return next();

  const user = await db.query.user({
    where: { id: req.userId }
  }, '{ id, permissions, email, name }');

  req.user = user;

  next();
});

// if (process.env.NODE_ENV !== 'production') {
//   export DEBUG="*";
// }



server.start(
  {
    cors: {
      credentials: true,
      origin: clientUrl,
    },
  },
  details => {
    console.log('\nSERVER::    GraphQLServer Starting . . . 🚀  ');
    console.log(`SERVER::    Environment: ${node_env}`);
    console.info(`SERVER::    Port: ${details.port}`);
    console.info(`SERVER::    CORS origin: ${!!details.cors ? details.cors.origin : ''}`);
    console.info(`SERVER::    DB Endpoint: ${endpoint}`);
    console.info(`SERVER::    Server Url: ${serverUrl}\n`);
  }
);
