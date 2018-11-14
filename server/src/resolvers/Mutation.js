const bcrypt = require('bcryptjs');


const Mutation = {
  async createUser(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);

    return await ctx.db.mutation.createUser(
      { data: {
        ...args,
        password
      }},
      info
    );
  },
  async createProduct(parent, args, ctx, info) {
    // Logged in?
    const userId = ctx.request.userId || 'cjobtu6tgni0p0a010vdol4oy';
    if (!userId) throw new Error('You must be signed in to create a product');

    return await ctx.db.mutation.createProduct(
      { data: {
        ...args,
        productVariants: {},
        user: { connect: { id: userId } }
      }},
      info
    );
  },
  async deleteProduct(parent, args, ctx, info) {
    const id = args.id;
    // Logged in?
    const userId = ctx.request.userId || 'cjobtu6tgni0p0a010vdol4oy';
    if (!userId) throw new Error('You must be signed in to delete a product');
    // Existing product?
    const existingProduct = await ctx.db.query.product(
      { where: { id }}
    );
    if (!existingProduct) throw new Error('You cannot delete a product which does not exist');
    // Creator of product?
    if (existingProduct.user.id !== userId) throw new Error('You are not authorized to delete this product');

    // Delete productVariations
    const deletedVariants = await ctx.db.mutation.deleteManyProductVariants(
      { where: {
        product: { id }
      }}
    );
    // Delete product
    return await ctx.db.mutation.deleteProduct(
      { where: { id }},
      info
    );
  },
  async updateProduct(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // Logged in?
    const userId = ctx.request.userId || 'cjobtu6tgni0p0a010vdol4oy';
    if (!userId) throw new Error('You must be signed in to add to a product');
    // Existing product?
    const existingProduct = await ctx.db.query.product(
      { where: { id: args.id }}
    );
    if (!existingProduct) {
      throw new Error('Cannot find product with this id');
    } else {
      // if (existingProduct.user.id !== userId) throw new Error('You are not authorized to delete this product');
      console.log('This product already exists. Updating properties.');
      return await ctx.db.mutation.updateProduct(
        {
          where: { id: existingProduct.id },
          data: updates
        },
        info
      );
    }
  },
  async createProductVariant(parent, args, ctx, info) {
    const productId = args.productId;
    delete args.productId;
    // Logged in?
    const userId = ctx.request.userId || 'cjobtu6tgni0p0a010vdol4oy';
    if (!userId) throw new Error('You must be signed in to add to a product');
    // Existing product?
    const existingProduct = await ctx.db.query.product(
      { where: {
        id: productId
      }}
    );
    if (!existingProduct) throw new Error('Cannot find product with this id');
    // Existing productVariant?
    const [existingProductVariant] = await ctx.db.query.productVariants(
      { where: {
        ...args,
        product: { id: productId }
      }}
    );

    if (existingProductVariant) {
      console.log('This productVariant already exists for the product. Updating quantity.');
      return await ctx.db.mutation.updateProductVariant(
        {
          where: { id: existingProductVariant.id },
          data: { quantity: existingProductVariant.quantity + args.quantity }
        },
        info
      );
    } else {
      console.log('Creating new productVariation and updating product with new connection.');
      const newProductVariant = await ctx.db.mutation.createProductVariant(
        { data: {
          ...args,
          product: { connect: { id: productId }}
        }},
        info
      );
      const updatedProduct = await ctx.db.mutation.updateProduct(
        {
          where: { id: productId },
          data: {
            productVariants: { connect: { id: newProductVariant.id }}
          }
        },
        info
      );

      return newProductVariant;
    }
  },
  async removeFromProduct(parent, args, ctx, info) {
    const id = args.id;
    const quantity = args.quantity;
    // Logged in?
    const userId = ctx.request.userId || 'cjobtu6tgni0p0a010vdol4oy';
    if (!userId) throw new Error('You must be signed in to remove from product');
    // Existing productVariant?
    const [existingProductVariant] = await ctx.db.query.productVariants(
      { where: { id }},
      info
    );
    if (!existingProductVariant) throw new Error('No productVariant found!');

    const existingQuantity = existingProductVariant.quantity;
    if (existingQuantity > quantity) {
      // Update productVariant with decreased quantity
      return await ctx.db.mutation.updateProductVariant(
        {
          where: { id },
          data: { quantity: existingQuantity - quantity }
        },
        info
      );
    } else if (existingQuantity === quantity) {
      console.log('blah', existingProductVariant);
      // delete productVariant
      return await ctx.db.mutation.deleteProductVariant(
        { where: { id }},
        info
      );
    } else {
      throw new Error(`You cannot remove ${quantity} of ${existingQuantity} productVariants`);
    }
  }
};

module.exports = Mutation;
