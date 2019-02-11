const { hasPermission } = require('../../utils');


module.exports = async function createProductVariant(parent, args, ctx, info) {
  const data = { ...args };
  const productId = args.productId;
  const imageId = args.imageId;
  delete data.productId;
  delete data.imageId;

  // Logged in?
  const { userId } = ctx.request;
  if (!userId) throw new Error('CREATE SELECTION: You must be signed in to add to a selection to a product.');

  // Existing product?
  const [existingProduct] = await ctx.db.query.products({
    where: { id: productId }
  }, `{ id user { id } images { id } image { id } }`);
  if (!existingProduct) throw new Error(`CREATE SELECTION: Cannot find product with ID '${productId}'.`);

  // requester has permission to delete?
  const ownsItem = existingProduct.user.id === userId;
  const hasPermissions = ctx.request.user.permissions.some(permission =>
    ['ADMIN', 'PRODUCTUPDATE'].includes(permission)
  );
  if (!ownsItem && !hasPermissions) throw new Error("CREATE SELECTION: You are not authorized to create a selection for this product.");

  // Existing productVariant?
  const [existingProductVariant] = await ctx.db.query.variants({
    where: {
      size: data.size,
      color: data.color,
      product: { id: productId }
    }
  });
  if (!!existingProductVariant) throw new Error(`CREATE SELECTION: A selection with this size and color already exists for this product.`);

  // Existing image?
  const [existingImg] = await ctx.db.query.images({
    where: { id: imageId }
  });
  if (!existingImg) throw new Error(`CREATE SELECTION: No image found with ID '${imageId}'.`);

  // Update product.images with incoming image?
  if (!existingProduct.images.find(img => img.id === `${imageId}`)) {
    await ctx.db.mutation.updateProduct({
      where: { id: productId },
      data: { images: { connect: { id: imageId }}}
    });
  }

  return await ctx.db.mutation.createVariant({
    data: {
      ...data,
      availability: `${data.quantity} in Stock!`,
      image: { connect: { id: imageId }},
      product: { connect: { id: productId }}
    }
  }, info);
};
