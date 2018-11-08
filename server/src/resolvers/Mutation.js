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
    const userId = ctx.request.userId || 'cjo85can56l7p0a01z7tuoksl';
    if (!userId) throw new Error('You must be signed in to create a product');

    return await ctx.db.mutation.createProduct(
      { data: {
        ...args,
        user: { connect: { id: userId } }
      }},
      info
    );
  },
  async deleteProduct(parent, args, ctx, info) {
    const id = args.id;
    // Logged in?
    const userId = ctx.request.userId || 'cjo85can56l7p0a01z7tuoksl';
    if (!userId) throw new Error('You must be signed in to delete a product');
    // Existing product?
    const existingProduct = await ctx.db.query.product(
      { where: { id }}
    );
    if (!existingProduct) throw new Error('You cannot delete a product which does not exist');
    // Creator of product?
    if (existingProduct.user.id !== userId) throw new Error('You are not authorized to delete this product');

    // Delete product
    return await ctx.db.mutation.deleteProduct(
      { where: { id }},
      info
    );
  }
};

module.exports = Mutation;
