
module.exports = async function updateCartItem(parent, args, ctx, info) {
  const quantity = args.quantity;
  // logged in?
  const { userId } = ctx.request;
  if (!userId) throw new Error('You must be signed in soooon');

  // cartItem exists?
  const [existingCartItem] = await ctx.db.query.cartItems({
    where: {
      user: { id: userId },
      variant: { id: args.id }
    }
  }, `{ id quantity variant { id quantity }}`);
  if (!existingCartItem) throw new Error("UPDATE CARTITEM: No CartItem with this selection exists.")

  // cartItem already in cart? (update quantity)
  if (quantity > existingCartItem.variant.quantity) throw new Error("UPDATE CARTITEM: Update amount exceeds existing amount available.")
  if (quantity <= 0) throw new Error("UPDATE CARTITEM: Cannot update item amount to 0. Choose Remove instead.")

  return ctx.db.mutation.updateCartItem({
    where: { id: existingCartItem.id },
    data: { quantity }
  }, info);
};
