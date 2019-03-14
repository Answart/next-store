const { getCartTotals } = require('../../utils');


const OrderMutations = {
  async createOrder(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) throw new Error('You must be signed in to create an order.');

    const user = await ctx.db.query.user({
      where: { id: userId }
    }, '{ id name email cart { id quantity variant { id price quantity color size sale salePrice image { id image_url } product { id title user { id }}}}}');

    // Create prepped OrderItems data from cart
    const orderItems = user.cart.map(cartItem => {
      return {
        title: cartItem.variant.product.title,
        price: cartItem.variant.sale
          ? cartItem.variant.salePrice
          : cartItem.variant.price,
        quantity: cartItem.quantity,
        size: cartItem.variant.size,
        color: cartItem.variant.color,
        image_url: cartItem.variant.image.image_url,
        variant: { connect: { id: cartItem.variant.id } },
        seller: { connect: { id: cartItem.variant.product.user.id } },
      };
    });

    // Recalculate orderItem totals
    const { quantity, shipping, tax, subtotal, sales_tax_rate, shipping_rate } = getCartTotals(orderItems)
    const grandTotal = (shipping + tax + subtotal);

    const order = await ctx.db.mutation.createOrder({
      data: {
        quantity,
        subtotal,
        shipping,
        tax,
        total: grandTotal,
        sales_tax_rate,
        shipping_rate,
        payment: 'stripe_charge_amount',
        buyer: { connect: { id: user.id } },
        items: { create: orderItems },
      },
    }, info);

    // Update Variant quantities
    const variantsToUpate = user.cart.map(cartItem => {
      return {
        id: cartItem.variant.id,
        quantity: (cartItem.variant.quantity - cartItem.quantity),
      }
    });
    const len = variantsToUpate.length;
    for (let i = 0; i < len; i ++) {
      await ctx.db.mutation.updateVariant({
        where: { id: variantsToUpate[i].id },
        data: {
          quantity: variantsToUpate[i].quantity,
          availability: `${variantsToUpate[i].quantity} in Stock!`,
        }
      });
    }

    // Delete cart items
    const cartItemIds = user.cart.map(cartItem => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: cartItemIds,
      },
    });

    return order;
  }
};


module.exports = OrderMutations;
