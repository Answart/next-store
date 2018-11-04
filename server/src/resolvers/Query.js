const Query = {
  async users(parent, args, ctx, info) {
    const users = ctx.db.query.users({}, info);

    return users;
  },
  user(parent, args, ctx, info) {
    const user = ctx.db.query.user(
      {
        where: { id: args.id },
      },
      info
    );

    return user;
  }
};

module.exports = Query;
