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
  async createImage(parent, args, ctx, info) {
    const data = { ...args };

    // Logged in?
    const userId = ctx.request.userId || 'cjpmd6acr4j2c0a422niv2rp1';
    if (!userId) throw new Error('CREATE IMAGE: You must be signed in to create an image.');

    // Existing image?
    const [existingImg] = await ctx.db.query.images({
      where: { ...data }
    }, info);
    if (!!existingImg) {
      console.log('CREATE IMAGE: Returning existing image found with incoming cloudinary_id.');
      return existingImg;
    }

    delete data.id;
    return await ctx.db.mutation.createImage({
      data: {
        ...data,
        user: { connect: { id: userId } }
      }
    }, info);
  },
  async deleteImage(parent, args, ctx, info) {
    return await ctx.db.mutation.deleteImage({
      where: { id: args.id }
    }, info);
  },
  async createProduct(parent, args, ctx, info) {
    const imageId = args.imageId;
    const data = { ...args };
    delete data.imageId;

    // Logged in?
    const userId = ctx.request.userId || 'cjpmd6acr4j2c0a422niv2rp1';
    if (!userId) throw new Error('CREATE PRODUCT: You must be signed in to create a product.');

    // Existing image?
    const [incomingImg] = await ctx.db.query.images({
      where: { id: imageId }
    });
    if (!incomingImg) throw new Error(`CREATE PRODUCT: No image found with ID '${imageId}'.`);

    return await ctx.db.mutation.createProduct({
      data: {
        ...data,
        user: { connect: { id: userId } },
        image: { connect: { id: imageId } }
      }
    }, info);
  },
  async updateProduct(parent, args, ctx, info) {
    const imageId = args.imageId;
    const data = { ...args };
    delete data.id;
    delete data.imageId;

    // Logged in?
    const userId = ctx.request.userId || 'cjpmd6acr4j2c0a422niv2rp1';
    if (!userId) throw new Error('UPDATE PRODUCT: You must be signed in to add to a product.');

    // Existing product?
    const existingProduct = await ctx.db.query.product({
      where: { id: args.id }
    }, `{ id title image { id } user { id }}`);
    if (!existingProduct) throw new Error('UPDATE PRODUCT: No product found with that id.');
    if (existingProduct.user.id !== userId) throw new Error('UPDATE PRODUCT: You are not authorized to update this product.');

    // Existing image?
    const [incomingImg] = await ctx.db.query.images({
      where: { id: imageId }
    });
    if (!incomingImg) throw new Error(`UPDATE PRODUCT: No image found with ID '${imageId}'.`);

    // Update w/new image?
    if (existingProduct.image.id !== imageId) data.image = { connect: { id: imageId } };

    const updatedProduct = await ctx.db.mutation.updateProduct({
      where: { id: existingProduct.id },
      data
    }, info);

    // (Delete old image. MAY NOT BE NECESSARY?)
    if (existingProduct.image.id !== imageId) {
      console.log('deleting old image', incomingImg)

      const variantsToUpdate = await ctx.db.query.productVariants({
        where: { image: { id: existingProduct.image.id }}
      });
      console.log('after updateManyProductVariants', variantsToUpdate);
      for (let i = 0; i < variantsToUpdate.length; i ++) {
        const id = variantsToUpdate[i].id;
        await ctx.db.mutation.productVariant({
          where: { id },
          data: { image: { connect: { id: imageId }}}
        });
      }
      console.log('finished updating');

      await ctx.db.mutation.deleteImage({
        where: { id: existingProduct.image.id }
      });
      console.log('after deleting old image')
    }

    return updatedProduct;
  },
  async deleteProduct(parent, args, ctx, info) {
    const where = { id: args.id };

    // Logged in?
    const userId = ctx.request.userId || 'cjpj0izxabhkj0a15jmipydzc';
    if (!userId) throw new Error('DELETE PRODUCT: You must be signed in to delete a product');

    // Existing product?
    const existingProduct = await ctx.db.query.product({
      where
    }, `{ id title image { id } user { id }}`);
    if (!existingProduct) throw new Error('DELETE PRODUCT: No product found with that id.');
    if (existingProduct.user.id !== userId) throw new Error('DELETE PRODUCT: You are not authorized to delete this product.');

    if (!!existingProduct.image) {
      // delete cloudinaryImages here too
      await ctx.db.mutation.deleteManyImages({
        where: { product: { id: existingProduct.id }}
      });
    }

    if (!!existingProduct.productVariants.length) {
      await ctx.db.mutation.deleteManyProductVariants({
        where: { product: { id: existingProduct.id }}
      });
    }

    return await ctx.db.mutation.deleteProduct({ where }, info);
  },
  async createProductVariant(parent, args, ctx, info) {
    const data = { ...args };
    const productId = args.productId;
    const imageId = args.imageId;
    delete data.productId;
    delete data.imageId;

    // Logged in?
    const userId = ctx.request.userId || 'cjpmd6acr4j2c0a422niv2rp1';
    if (!userId) throw new Error('CREATE SELECTION: You must be signed in to add to a selection to a product.');

    // Existing product?
    const existingProduct = await ctx.db.query.product({
      where: { id: productId }
    }, `{ id title image { id cloudinary_id } user { id }}`);
    if (!existingProduct) throw new Error(`CREATE SELECTION: Cannot find product with ID '${productId}'.`);
    if (existingProduct.user.id !== userId) throw new Error('CREATE SELECTION: You are not authorized to update this product.');

    // Existing productVariant?
    const [existingProductVariant] = await ctx.db.query.productVariants({
      where: {
        size: data.size,
        color: data.color,
        product: { id: productId }
      }
    });
    if (!!existingProductVariant) throw new Error(`CREATE SELECTION: A selection with this size/color already exists with ID '${existingProductVariant.id}'.`);

    // Existing image?
    const [incomingImg] = await ctx.db.query.images({
      where: { id: imageId }
    });
    if (!incomingImg) throw new Error(`CREATE SELECTION: No image found with ID '${imageId}'.`);

    const newProductVariant = await ctx.db.mutation.createProductVariant({
      data: {
        ...data,
        availability: `${data.quantity} in Stock!`,
        image: { connect: { id: imageId }},
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
  },
  async createProductVariantWithImage(parent, args, ctx, info) {
    const productId = args.productId;
    const { data, imgData } = getDataAndImgData(args);
    delete data.id;
    delete data.productId;

    // Logged in?
    const userId = ctx.request.userId || 'cjpj0izxabhkj0a15jmipydzc';
    if (!userId) throw new Error('CREATE SELECTION: You must be signed in to add to a selection to a product.');

    // Existing product?
    const existingProduct = await ctx.db.query.product({
      where: { id: productId }
    }, `{ id title image { id cloudinary_id } user { id }}`);
    if (!existingProduct) throw new Error(`CREATE SELECTION: Cannot find product with ID '${productId}'`);
    if (existingProduct.user.id !== userId) throw new Error('CREATE SELECTION: You are not authorized to update this product.');

    // Existing productVariant?
    const [existingProductVariant] = await ctx.db.query.productVariants({
      where: {
        size: data.size,
        color: data.color,
        product: { id: productId }
      }
    });
    if (!!existingProductVariant) throw new Error(`CREATE SELECTION: A selection with ID '${existingProductVariant.id}' already exists with this size/color for this product.`);

    // Create with existing or new image?
    let imageId;
    if (imgData.cloudinary_id === existingProduct.image.cloudinary_id) {
      // Use image from product.image
      imageId = existingProduct.image.id;
    } else {
      const newImage = await ctx.db.mutation.createImage({
        data: {
          ...imgData,
          user: { connect: { id: userId } }
        }
      });
      imageId = newImage.id;
    }

    const newProductVariant = await ctx.db.mutation.createProductVariant({
      data: {
        ...data,
        availability: `${data.quantity} in Stock!`,
        image: { connect: { id: imageId }},
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
  },
  async updateProductVariant(parent, args, ctx, info) {
    const data = { ...args };
    let imageId;
    if (args.imageId) {
      imageId = args.imageId;
      delete data.imageId;
    }
    delete data.id;

    // Logged in?
    const userId = ctx.request.userId || 'cjpmd6acr4j2c0a422niv2rp1';
    if (!userId) throw new Error('UPDATE SELECTION: You must be signed in to add a selection to a product.');

    // Existing productVariant?
    const [existingProductVariant] = await ctx.db.query.productVariants({
      where: { id: args.id }
    }, `{ id quantity image { id cloudinary_id } product { user { id }}}`);
    if (!existingProductVariant) throw new Error(`UPDATE SELECTION: No productVariant found with id '${args.id}'.`);
    if (existingProductVariant.product.user.id !== userId) throw new Error('UPDATE SELECTION: You are not authorized to update this selection.');

    // Update image?
    if (imageId) {
      // Existing image?
      const [incomingImg] = await ctx.db.query.images({
        where: { id: imageId }
      });
      if (!incomingImg) throw new Error(`CREATE SELECTION: No image found with ID '${imageId}'.`);

      if (incomingImg.id !== existingProductVariant.image.id) {
        data.image = { connect: { id: incomingImg.id } };
      }
    }

    // Update availability?
    if (data.quantity !== existingProductVariant.quantity) {
      data.availability = `${data.quantity} in Stock!`;
    }

    return await ctx.db.mutation.updateProductVariant({
      where: { id: existingProductVariant.id },
      data
    }, info);
  },
  async updateProductVariantWithImage(parent, args, ctx, info) {
    const { data, imgData } = getDataAndImgData(args);
    delete data.id;

    // Logged in?
    const userId = ctx.request.userId || 'cjpj0izxabhkj0a15jmipydzc';
    if (!userId) throw new Error('UPDATE SELECTION: You must be signed in to add a selection to a product.');

    // Existing productVariant?
    const [existingProductVariant] = await ctx.db.query.productVariants({
      where: { id: args.id }
    }, `{ id quantity image { id cloudinary_id } product { user { id }}}`);
    if (!existingProductVariant) throw new Error(`UPDATE SELECTION: No productVariant found with id '${args.id}'`);
    if (existingProductVariant.product.user.id !== userId) throw new Error('UPDATE SELECTION: You are not authorized to update this selection.');

    // Update image?
    if (imgData.cloudinary_id !== existingProductVariant.image.cloudinary_id) {
      // Existing incoming image?
      const [incomingExistingImg] = await ctx.db.query.images({
        where: { cloudinary_id: imgData.cloudinary_id }
      });
      if (!!incomingExistingImg) {
        data.image = { connect: { id: incomingExistingImg.id } };
      } else {
        const newImage = await ctx.db.mutation.createImage({
          data: {
            ...imgData,
            user: { connect: { id: userId } }
          }
        });
        data.image = { connect: { id: newImage.id } };
      }
    }

    // Update availability?
    if (data.quantity !== existingProductVariant.quantity) data.availability = `${data.quantity} in Stock!`;

    return await ctx.db.mutation.updateProductVariant({
      where: { id: existingProductVariant.id },
      data
    }, info);
  },
  async deleteProductVariant(parent, args, ctx, info) {
    const where = { id: args.id };

    // Logged in?
    const userId = ctx.request.userId || 'cjpj0izxabhkj0a15jmipydzc';
    if (!userId) throw new Error('DELETE SELECTION: You must be signed in to delete a product.');

    // Existing product?
    const productVariant = await ctx.db.query.productVariant({ where });
    if (!productVariant) throw new Error(`DELETE SELECTION: No selection with ID '${args.id}' found.`)

    return await ctx.db.mutation.deleteProductVariant({ where }, info);
  }
};

module.exports = Mutation;
