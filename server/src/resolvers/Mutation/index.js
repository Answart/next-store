const createUser = require('./createUser');
const signin = require('./signin');
const signout = require('./signout');
const requestPasswordReset = require('./requestPasswordReset');
const resetPassword = require('./resetPassword');
const updatePermissions = require('./updatePermissions');
const createImage = require('./createImage');
const deleteImage = require('./deleteImage');
const createProduct = require('./createProduct');
const updateProduct = require('./updateProduct');
const deleteProduct = require('./deleteProduct');
const createProductVariant = require('./createProductVariant');
const updateProductVariant = require('./updateProductVariant');
const deleteProductVariant = require('./deleteProductVariant');
const addToCart = require('./addToCart');
const removeFromCart = require('./removeFromCart');
const updateCartItem = require('./updateCartItem');


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
