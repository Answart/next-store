const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');


const Query = {
  me(parent, args, ctx, info) {
    const id = ctx.request.userId;
    console.log('me.id', id)
    if (!id) return null;

    return ctx.db.query.user({
      where: { id },
    }, info);
  },
  async users(parent, args, ctx, info) {
    if (!ctx.request.userId) throw new Error('USERS: You must be logged in!');

    // requester has permission to query all users?
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

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
