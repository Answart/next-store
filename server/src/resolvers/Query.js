const { forwardTo } = require('prisma-binding');


const Query = {
  user(parent, args, ctx, info) {
    return ctx.db.query.user(
      { where: { id: args.id } },
      info
    );
  },
  async users(parent, args, ctx, info) {
    return ctx.db.query.users({}, info);
  },
  image: forwardTo('db'),
  images: forwardTo('db'),
  product: forwardTo('db'),
  products: forwardTo('db'),
  productVariant: forwardTo('db'),
  productVariants: forwardTo('db')
};

module.exports = Query;
