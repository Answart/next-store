const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '.env' });

const createServer = require('./createServer.js');
const db = require('./db');
const server = createServer();

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
      origin: process.env.CLIENT_URL,
    },
  },
  details => {
    console.log(`Server is now running on port http://localhost:${details.port}`);
  }
);
