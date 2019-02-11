const { hasPermission } = require('../../utils');


module.exports = async function updateProductVariant(parent, args, ctx, info) {
  const imageId = args.imageId;
  const data = { ...args };
  delete data.imageId;
  delete data.id;

  // Logged in?
  const { userId } = ctx.request;
  if (!userId) throw new Error('UPDATE SELECTION: You must be signed in to add a selection to a product.');

  // Existing productVariant?
  const [existingProductVariant] = await ctx.db.query.variants({
    where: { id: args.id }
  }, `{ id image { id } product { id images { id } user { id }}}`);
  if (!existingProductVariant) throw new Error(`UPDATE SELECTION: No productVariant found with id '${args.id}'.`);

  // requester has permission to update?
  const ownsItem = existingProductVariant.product.user.id === userId;
  const hasPermissions = ctx.request.user.permissions.some(permission =>
    ['ADMIN', 'PRODUCTUPDATE'].includes(permission)
  );
  if (!ownsItem && !hasPermissions) throw new Error("UPDATE SELECTION: You are not authorized to update for this product.");

  // Update image?
  if (existingProductVariant.image.id !== imageId) {
    const existingImg = await ctx.db.query.image({
      where: { id: imageId }
    });
    if (!existingImg) throw new Error(`CREATE SELECTION: No image found with ID '${imageId}'.`);

    data.image = { connect: { id: imageId } };
  }

  // Update product.images with incoming image?
  if (!existingProductVariant.product.images.find(img => img.id === `${imageId}`)) {
    await ctx.db.mutation.updateProduct({
      where: { id: existingProductVariant.product.id },
      data: { images: { connect: { id: imageId }}}
    });
  }

  // Update availability?
  if (data.quantity !== existingProductVariant.quantity) {
    data.availability = `${data.quantity} in Stock!`;
  }

  return await ctx.db.mutation.updateVariant({
    where: { id: existingProductVariant.id },
    data
  }, info);
};
