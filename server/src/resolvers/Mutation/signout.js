module.exports = async function signout(parent, args, ctx, info) {
  ctx.response.clearCookie('token');

  return { success: true, message: 'Goodbye!' };
};
