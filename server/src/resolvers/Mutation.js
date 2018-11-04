const bcrypt = require('bcryptjs');


const Mutation = {
  async createUser(parent, args, ctx, info) {
    const id = Math.floor(Math.random() * Math.floor(999999));
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password
        },
      },
      info
    );

    return user;
  }
};

module.exports = Mutation;
