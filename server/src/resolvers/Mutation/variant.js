const { hasPermission } = require('../../utils');


const VariantMutations = {
  async createProductVariant(parent, args, ctx, info) {
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
  },
  async updateProductVariant(parent, args, ctx, info) {
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
  },
  async deleteProductVariant(parent, args, ctx, info) {
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
  }
};


module.exports = VariantMutations;
