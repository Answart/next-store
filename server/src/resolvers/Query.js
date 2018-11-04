const Query = {
  async users(parent, args, ctx, info) {
    return ctx.db.users;
  },
  user(parent, args, ctx, info) {
    const user = ctx.db.users.find(x => x.id.toString() === args.id.toString());

    return user;
  }
};

module.exports = Query;
