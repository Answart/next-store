const { GraphQLServer } = require('graphql-yoga')
const bcrypt = require('bcryptjs');

let dummys = [
  {
    id: 101010,
    name: 'First dummy',
    email: 'dummy@dummy.com',
    password: 'dummydummy'
  }
];

const resolvers = {
  Query: {
    async users(parent, args) {
      return dummys;
    },
    user(parent, args) {
      const dummy = dummys.find(x => x.id.toString() === args.id.toString());
      return dummy;
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
      dummys.push(user);
      return user;
    },
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`));
