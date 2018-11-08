const { forwardTo } = require('prisma-binding');


const Query = {
  products: forwardTo('db'),
  product: forwardTo('db'),
  productVariants: forwardTo('db'),
  productVariant: forwardTo('db'),
  async users(parent, args, ctx, info) {
    return ctx.db.query.users({}, info);
  },
  user(parent, args, ctx, info) {
    return ctx.db.query.user(
      { where: { id: args.id } },
      info
    );
  }
};

module.exports = Query;
