const bcrypt = require('bcryptjs');


const getDataAndImgData = function(args) {
  const imgKeys = ['cloudinary_id', 'name', 'width', 'height', 'transformation', 'image_url', 'large_image_url'];
  let data = { ...args };
  let imgData = {};

  for (let i = 0; i < imgKeys.length; i++) {
    const key = imgKeys[i];
    imgData[key] = data[key];
    delete data[key];
  }

  return { data, imgData };
};


const Mutation = {
  async createUser(parent, args, ctx, info) {
    const data = { ...args };
    data.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    data.password = password;

    return await ctx.db.mutation.createUser({ data }, info);
  },
  async deleteImage(parent, args, ctx, info) {
    return await ctx.db.mutation.deleteImage({
      where: { id: args.id }
    }, info);
  },
  async createProduct(parent, args, ctx, info) {
    const data = { ...args };
    // Logged in?
    const userId = ctx.request.userId || 'cjoxto7d5l5z70a713fae9fur';
    if (!userId) throw new Error('You must be signed in to create a product');

    return await ctx.db.mutation.createProduct({
      data: {
        ...data,
        productVariants: {},
        user: { connect: { id: userId } }
      }
    }, info);
  },
  async createProductWithImage(parent, args, ctx, info) {
    const { data, imgData } = getDataAndImgData(args);

    // Logged in?
    const userId = ctx.request.userId || 'cjpamijz53ny709197e43hhkx';
    if (!userId) throw new Error('You must be signed in to create a product');

    const newImage = await ctx.db.mutation.createImage({
      data: {
        ...imgData,
        user: { connect: { id: userId } }
      }
    });

    return await ctx.db.mutation.createProduct({
      data: {
        ...data,
        user: { connect: { id: userId } },
        image: { connect: { id: newImage.id } }
      }
    }, info);
  },
  async deleteProduct(parent, args, ctx, info) {
    // Logged in?
    const userId = ctx.request.userId || 'cjoxto7d5l5z70a713fae9fur';
    if (!userId) throw new Error('You must be signed in to delete a product');
    // Existing product?
    const product = await ctx.db.query.product({
      where
    }, `{ id title user { id } }`);
    // Check if they own that product, or have the permissions
    const ownsItem = product.user.id === userId;
    if (!ownsItem) throw new Error("You don't have permission to do that!");

    if (product.productVariants.length) {
      await ctx.db.mutation.deleteManyProductVariants({
        where: { product: { id: args.id }}
      });

      return await ctx.db.mutation.deleteProduct({ where }, info);
    } else {
      return await ctx.db.mutation.deleteProduct({ where }, info);
    }
  },
  async updateProduct(parent, args, ctx, info) {
    // first take a copy of the updates
    const data = { ...args };
    // remove the ID from the updates
    delete data.id;
    // Logged in?
    const userId = ctx.request.userId || 'cjoxto7d5l5z70a713fae9fur';
    if (!userId) throw new Error('You must be signed in to add to a product');
    // Existing product?
    const existingProduct = await ctx.db.query.product({
      where: { id: args.id }
    });

    if (!existingProduct) {
      throw new Error('Cannot find product with this id');
    } else {
      // if (existingProduct.user.id !== userId) throw new Error('You are not authorized to delete this product');
      console.log('This product already exists. Updating properties.');
      return await ctx.db.mutation.updateProduct({
        where: { id: existingProduct.id },
        data
      }, info);
    }
  },
  async createProductVariant(parent, args, ctx, info) {
    const productId = args.productId;
    const data = { ...args };
    delete data.productId;
    // Logged in?
    const userId = ctx.request.userId || 'cjoxto7d5l5z70a713fae9fur';
    if (!userId) throw new Error('You must be signed in to add to a product');
    // Existing product?
    const existingProduct = await ctx.db.query.product({
      where: { id: productId }
    });
    if (!existingProduct) throw new Error('Cannot find product with this id');
    // Existing productVariant?
    const [existingProductVariant] = await ctx.db.query.productVariants({
      where: {
        ...data,
        product: { id: productId }
      }
    });

    if (existingProductVariant) {
      console.log('This productVariant already exists for the product. Updating quantity.');
      const quantity = existingProductVariant.quantity + args.quantity;
      return await ctx.db.mutation.updateProductVariant({
        where: { id: existingProductVariant.id },
        data: {
          quantity,
          availability: `${quantity} in Stock!`
        }
      }, info);
    } else {
      console.log('Creating new productVariation and updating product with new connection.');
      const newProductVariant = await ctx.db.mutation.createProductVariant({
        data: {
          ...data,
          availability: `${data.quantity} in Stock!`,
          product: { connect: { id: productId }}
        }
      }, info);
      const updatedProduct = await ctx.db.mutation.updateProduct({
        where: { id: productId },
        data: {
          productVariants: { connect: { id: newProductVariant.id }}
        }
      });

      return newProductVariant;
    }
  },
  async updateProductVariant(parent, args, ctx, info) {
    const data = { ...args };
    delete data.id;
    // Logged in?
    const userId = ctx.request.userId || 'cjoxto7d5l5z70a713fae9fur';
    if (!userId) throw new Error('You must be signed in to add to a product');
    // Existing productVariant?
    const [existingProductVariant] = await ctx.db.query.productVariants({
      where: { id: args.id }
    });

    if (!existingProductVariant) {
      throw new Error('ProductVariant by this id cannot be found');
    } else {
      data.availability = `${data.quantity} in Stock!`;
      return await ctx.db.mutation.updateProductVariant({
        where: { id: existingProductVariant.id },
        data
      }, info);
    }
  },
  async deleteProductVariant(parent, args, ctx, info) {
    const where = { id: args.id };
    // Logged in?
    const userId = ctx.request.userId || 'cjoxto7d5l5z70a713fae9fur';
    if (!userId) throw new Error('You must be signed in to delete a product');
    // Existing product?
    const productVariant = await ctx.db.query.productVariant({ where });
    if (!productVariant) throw new Error('No selection with this id found')

    return await ctx.db.mutation.deleteProductVariant({ where }, info);
  },
  async removeFromProduct(parent, args, ctx, info) {
    const where = { id: args.id };
    const quantity = args.quantity;
    // Logged in?
    const userId = ctx.request.userId || 'cjoxto7d5l5z70a713fae9fur';
    if (!userId) throw new Error('You must be signed in to remove from product');
    // Existing productVariant?
    const [existingProductVariant] = await ctx.db.query.productVariants({ where });
    if (!existingProductVariant) throw new Error('No productVariant found!');

    const existingQuantity = existingProductVariant.quantity;
    if (existingQuantity > quantity) {
      // Update productVariant with decreased quantity
      return await ctx.db.mutation.updateProductVariant({
        where,
        data: { quantity: existingQuantity - quantity }
      }, info);
    } else if (existingQuantity === quantity) {
      return await ctx.db.mutation.deleteProductVariant({ where }, info);
    } else {
      throw new Error(`You cannot remove ${quantity} of ${existingQuantity} productVariants`);
    }
  }
};

module.exports = Mutation;
