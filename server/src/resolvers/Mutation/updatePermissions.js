const { hasPermission } = require('../../utils');


module.exports = async function updatePermissions(parent, args, ctx, info) {
  const { userId } = ctx.request;
  if (!userId) throw new Error('You must be logged in!');

  const currentUser = await ctx.db.query.user({
    where: { id: userId }
  }, info);

  // requester has permission to do this?
  hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);

  // update permission
  return ctx.db.mutation.updateUser({
    where: { id: args.userId },
    data: {
      permissions: { set: args.permissions }
    },
  }, info);
};
