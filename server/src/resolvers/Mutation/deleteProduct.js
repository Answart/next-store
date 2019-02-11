const { hasPermission } = require('../../utils');


module.exports = async function deleteProduct(parent, args, ctx, info) {
  const where = { id: args.id };

  // Logged in?
  const { userId } = ctx.request;
  if (!userId) throw new Error('DELETE PRODUCT: You must be signed in to delete a product.');

  // Existing product?
  const [existingProduct] = await ctx.db.query.products({ where }, `{ id user { id }}`);
  if (!existingProduct) throw new Error('DELETE PRODUCT: No product found with that id.');

  // requester has permission to delete?
  const ownsItem = existingProduct.user.id === userId;
  const hasPermissions = ctx.request.user.permissions.some(permission =>
    ['ADMIN', 'PRODUCTDELETE'].includes(permission)
  );
  if (!ownsItem && !hasPermissions) throw new Error("DELETE PRODUCT: You are not authorized to delete this product.");

  // TODO: delete cloudinaryImages here too?

  return await ctx.db.mutation.deleteProduct({ where }, info);
};
