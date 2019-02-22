const {
  createUser,
  signin,
  signout,
  requestPasswordReset,
  resetPassword,
  updatePermissions,
} = require('./user');
const {
  createImage,
  deleteImage,
} = require('./image');
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./product');
const {
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
} = require('./variant');
const {
  addToCart,
  updateCartItem,
  removeFromCart,
} = require('./cartItem');


const Mutation = {
  createUser,
  signin,
  signout,
  requestPasswordReset,
  resetPassword,
  updatePermissions,
  createImage,
  deleteImage,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
  addToCart,
  removeFromCart,
  updateCartItem
};


module.exports = Mutation;
