const { hasPermission } = require('../../utils');


module.exports = async function createProduct(parent, args, ctx, info) {
  const imageId = args.imageId;
  const data = { ...args };
  delete data.imageId;

  // Logged in?
  const { userId } = ctx.request;
  if (!userId) throw new Error('CREATE PRODUCT: You must be signed in to create a product.');

  // requester has permission to delete?
  const hasPermissions = ctx.request.user.permissions.some(permission =>
    ['ADMIN', 'PRODUCTCREATE'].includes(permission)
  );
  if (!hasPermissions) throw new Error("CREATE SELECTION: You are not authorized. Apply to our Designer program to submit products on NextStore.");

  // Existing image?
  const [existingImg] = await ctx.db.query.images({
    where: { id: imageId }
  });
  if (!existingImg) throw new Error(`CREATE PRODUCT: No image found with ID '${imageId}'.`);

  // Create image with known user/image
  return await ctx.db.mutation.createProduct({
    data: {
      ...data,
      user: { connect: { id: userId } },
      image: { connect: { id: imageId } },
      images: { connect: { id: imageId } }
    }
  }, info);
};
