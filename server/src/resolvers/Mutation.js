const bcrypt = require('bcryptjs');


const Mutation = {
  async createUser(parent, args, ctx, info) {
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
  },
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  },
  async deleteItem(parent, args, ctx, info) {
    return ctx.db.mutation.deleteItem({ where: { id: args.id }}, info);
  }
};

module.exports = Mutation;
