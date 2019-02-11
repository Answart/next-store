module.exports = async function removeFromCart(parent, args, ctx, info) {
  const where = { id: args.id };

  // cartItem exists?
  const cartItem = await ctx.db.query.cartItem({
    where
  }, `{ id user { id }}`);

  if (!cartItem) throw new Error('No CartItem Found!');
  if (cartItem.user.id !== ctx.request.userId) throw new Error('REMOVE FROM CART: Cannot remove item from cart that is not yours.');

  return ctx.db.mutation.deleteCartItem({
    where
  }, info);
};
