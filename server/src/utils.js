const SALES_TAX_RATE = 0.0925;
const SHIPPING_COST_PER_ITEM = 1.2;


function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions: ${permissionsNeeded}. You Have: ${user.permissions}`);
  }
};

function getCartTotals(cart = []) {
  let quantity = 0;
  let shipping = 0;
  let tax = 0;
  let subtotal = 0;

  if (!!cart && !!cart.length) {
    quantity = cart.reduce((tally, cartItem) => {
      subtotal += cartItem.quantity * cartItem.price;
      shipping += cartItem.quantity * SHIPPING_COST_PER_ITEM;
      tax += cartItem.quantity * cartItem.price * SALES_TAX_RATE;

      return tally + cartItem.quantity;
    }, 0);
  }

  return {
    quantity,
    shipping: Number(parseFloat(shipping).toFixed(2)),
    tax: Number(parseFloat(tax).toFixed(2)),
    subtotal: Number(parseFloat(subtotal).toFixed(2)),
    sales_tax_rate: SALES_TAX_RATE,
    shipping_rate: SHIPPING_COST_PER_ITEM,
  };
};

module.exports = {
  hasPermission,
  getCartTotals,
}
