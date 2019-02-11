module.exports = async function deleteImage(parent, args, ctx, info) {
  return await ctx.db.mutation.deleteImage({
    where: { id: args.id }
  }, info);
};
