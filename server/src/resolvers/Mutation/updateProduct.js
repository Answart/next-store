const { hasPermission } = require('../../utils');


module.exports = async function updateProduct(parent, args, ctx, info) {
  const productId = args.id;
  const imageId = args.imageId;
  const data = { ...args };
  delete data.id;
  delete data.imageId;

  // Logged in?
  const { userId } = ctx.request;
  if (!userId) throw new Error('UPDATE PRODUCT: You must be signed in to add to a product.');

  // Existing product?
  const [existingProduct] = await ctx.db.query.products({
    where: { id: productId }
  }, `{ id image { id } user { id }}`);
  if (!existingProduct) throw new Error('UPDATE PRODUCT: No product found with that id.');

  // requester has permission to update?
  const ownsItem = existingProduct.user.id === userId;
  const hasPermissions = ctx.request.user.permissions.some(permission =>
    ['ADMIN', 'PRODUCTUPDATE'].includes(permission)
  );
  if (!ownsItem && !hasPermissions) throw new Error("UPDATE PRODUCT: You are not authorized to update this product.");

  // Update w/new image?
  if (existingProduct.image.id !== imageId) {
    const [existingImg] = await ctx.db.query.images({
      where: { id: imageId }
    });
    if (!existingImg) throw new Error(`UPDATE PRODUCT: No image found with ID '${imageId}'.`);

    // Update w/new image. Old image's 'used_by_product' will now become null.
    data.image = { connect: { id: imageId }};
    // Add new image to product.images. Keep old image in products.images for eventual proper deletion during product's CASCADE deletions)
    data.images = { connect: { id: imageId }};

    // Find variants whose image was 'Same as Product Image' (AKA old image)
    const variantsToUpdate = await ctx.db.query.variants({
      where: { image: { id: existingProduct.image.id }}
    });
    if (!!variantsToUpdate.length) {
      // Update found varaint's image to new product Image
      for (let i = 0; i < variantsToUpdate.length; i ++) {
        const id = variantsToUpdate[i].id;
        await ctx.db.mutation.updateVariant({
          where: { id },
          data: {
            image: { connect: { id: imageId }}
          }
        });
      }
    }
  }

  return await ctx.db.mutation.updateProduct({
    where: { id: productId },
    data
  }, info);
};
