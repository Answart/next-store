const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, emailFromNextStoreSupport } = require('../../mail');
const appUrl = process.env.NODE_ENV == 'production'
  ? process.env.PROD_CLIENT_URL
  : process.env.DEV_CLIENT_URL;


module.exports = async function requestPasswordReset(parent, args, ctx, info) {
  const user = await ctx.db.query.user({
    where: { email: args.email }
  });
  if (!user) throw new Error(`No such user found for email ${args.email}`);

  // Set a reset token and expiry on user
  const randomBytesPromiseified = promisify(randomBytes);
  const resetToken = (await randomBytesPromiseified(20)).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

  await ctx.db.mutation.updateUser({
    where: { email: args.email },
    data: { resetToken, resetTokenExpiry },
  });

  // Email reset token
  const mailRes = await transport.sendMail({
    from: 'answart@sbcglobal.net',
    to: user.email,
    subject: 'NextStore | Password Reset Request',
    html: emailFromNextStoreSupport(`Your Password Reset Token is here!
    \n\n
    <a href="${appUrl}/reset?resetToken=${resetToken}">Click Here to Reset Your Password</a>`),
  });

  return { success: true, message: 'Your request has been sent! Check your email.' };
};
