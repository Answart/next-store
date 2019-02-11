const { hasPermission } = require('../../utils');


module.exports = async function deleteProductVariant(parent, args, ctx, info) {
  const where = { id: args.id };

  // Logged in?
  const { userId } = ctx.request;
  if (!userId) throw new Error('DELETE SELECTION: You must be signed in to delete a product.');

  // Existing product?
  const [existingProductVariant] = await ctx.db.query.variants({
    where
  }, `{ id product { id user { id }}}`);
  if (!existingProductVariant) throw new Error(`DELETE SELECTION: No selection with ID '${args.id}' found.`)

  // requester has permission to delete?
  const ownsItem = existingProductVariant.product.user.id === userId;
  const hasPermissions = ctx.request.user.permissions.some(permission =>
    ['ADMIN', 'PRODUCTUPDATE'].includes(permission)
  );
  if (!ownsItem && !hasPermissions) throw new Error("DELETE SELECTION: You are not authorized to delete this selection.");

  return await ctx.db.mutation.deleteVariant({ where }, info);
};
