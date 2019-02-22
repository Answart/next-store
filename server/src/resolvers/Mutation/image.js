

const ImageMutations = {
  async createImage(parent, args, ctx, info) {
    const data = { ...args };
    let productId;
    if (args.productId) {
      productId = args.productId;
      delete data.productId;
    }
    delete data.id;

    // Logged in?
    const { userId } = ctx.request;
    if (!userId) throw new Error('CREATE IMAGE: You must be signed in to create an image.');

    // Existing image?
    const [existingImg] = await ctx.db.query.images({
      where: { ...data }
    }, info);
    if (!!existingImg) return existingImg;

    const createdImage = await ctx.db.mutation.createImage({
      data: {
        ...data,
        user: { connect: { id: userId } }
      }
    }, info);

    if (productId) {
      await ctx.db.mutation.updateProduct({
        where: { id: productId },
        data: {
          image: { connect: { id: createdImage.id }},
          images: { connect: { id: createdImage.id }}
        }
      });
    }

    return createdImage;
  },
  async deleteImage(parent, args, ctx, info) {
    return await ctx.db.mutation.deleteImage({
      where: { id: args.id }
    }, info);
  }
};


module.exports = ImageMutations;
