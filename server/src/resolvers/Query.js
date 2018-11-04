const { forwardTo } = require('prisma-binding');


const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
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
