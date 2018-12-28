const { forwardTo } = require('prisma-binding');


const Query = {
  async users(parent, args, ctx, info) {
    if (!ctx.request.userId) throw new Error('USERS: You must be logged in!');

    return ctx.db.query.users({}, info);
  },
  image: forwardTo('db'),
  images: forwardTo('db'),
  product: forwardTo('db'),
  products: forwardTo('db'),
  productsConnection: forwardTo('db'),
  variant: forwardTo('db'),
  variants: forwardTo('db')
};

module.exports = Query;
