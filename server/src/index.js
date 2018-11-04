const { GraphQLServer } = require('graphql-yoga')
const bcrypt = require('bcryptjs');
const db = require('./db');


const resolvers = {
  Query: {
    async users(parent, args) {
      return db.users;
    },
    user(parent, args) {
      const user = db.users.find(x => x.id.toString() === args.id.toString());
      return user;
    }
  },
  Mutation: {
    async createUser(parent, args) {
      const id = Math.floor(Math.random() * Math.floor(999999));
      args.email = args.email.toLowerCase();
      const password = await bcrypt.hash(args.password, 10);
      const user = {
        id,
        name: args.name,
        email: args.email,
        password
      };
      db.users.push(user);
      return user;
    },
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`));
