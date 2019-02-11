module.exports = async function addToCart(parent, args, ctx, info) {
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

  // cartItem already in cart? (update quantity)
  if (existingCartItem) {
    if ((existingCartItem.quantity + 1) > existingCartItem.variant.quantity) throw new Error("ADD TO CART: Cannot add any more of this selection to cart.")

    return ctx.db.mutation.updateCartItem({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 }
    }, info);
  }

  return ctx.db.mutation.createCartItem({
    data: {
      user: { connect: { id: userId } },
      variant: { connect: { id: args.id } }
    }
  }, info);
};
