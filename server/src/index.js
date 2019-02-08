require('dotenv').config({ path: '.env' });

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('./db');
const createServer = require('./createServer.js');
const server = createServer();
const appUrl = (process.env.NODE_ENV == 'production')
  ? process.env.PROD_CLIENT_URL
  : process.env.DEV_CLIENT_URL;


server.express.use(cookieParser());

// middleware to set userId on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
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

server.start(
  {
    cors: {
      credentials: true,
      origin: appUrl,
    },
  },
  details => {
    console.log('\nSERVER::    GraphQLServer Starting . . .');
    console.log(`SERVER::    Environment: ${process.env.NODE_ENV}`);
    console.info(`SERVER::    Port: ${details.port}`);
    console.info(`SERVER::    CORS: ${!!details.cors ? details.cors.origin : ''}`);
    console.info(`SERVER::    Endpoint: ${details.endpoint}\n`);
  }
);
