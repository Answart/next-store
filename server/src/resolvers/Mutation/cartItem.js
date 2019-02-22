

const CartMutations = {
  async addToCart(parent, args, ctx, info) {
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
  },
  async updateCartItem(parent, args, ctx, info) {
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
  },
  async removeFromCart(parent, args, ctx, info) {
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
  }
};


module.exports = CartMutations;
