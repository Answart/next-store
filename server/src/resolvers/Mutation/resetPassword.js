const jwt = require('jsonwebtoken');
const maxAge = 1000 * 60 * 60 * 24 * 365;


module.exports = async function resetPassword(parent, args, ctx, info) {
  // passwords match?
  if (args.password !== args.confirmPassword) throw new Error("Your Passwords don't match!");

  // token legit and not expired?
  const [user] = await ctx.db.query.users({
    where: {
      resetToken: args.resetToken,
      resetTokenExpiry_gte: Date.now() - 3600000,
    },
  });
  if (!user) throw new Error('This token is either invalid or expired!');

  // save new password to user and remove old resetToken fields
  const password = await bcrypt.hash(args.password, 10);
  const updatedUser = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: {
      password,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge
  });

  return updatedUser;
};
