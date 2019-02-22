const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { hasPermission } = require('../../utils');
const { transport, emailFromNextStoreSupport } = require('../../mail');
const appUrl = process.env.NODE_ENV == 'production'
  ? process.env.PROD_CLIENT_URL
  : process.env.DEV_CLIENT_URL;
const maxAge = 1000 * 60 * 60 * 24 * 365;


const UserMutations = {
  async createUser(parent, args, ctx, info) {
    const data = { ...args };
    data.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);

    const user = await ctx.db.mutation.createUser({
      data: {
        ...data,
        password,
        permissions: { set: ['USER'] },
      }
    }, info);

    // create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set 1 year JWT token as response cookie token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge
    });

    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // User exists?
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) throw new Error(`No such user found for email ${email}`);

    // Password correct?
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid Password!');

    // create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set 1 year JWT token as response cookie token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge
    });

    return user;
  },
  async signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');

    return { success: true, message: 'Goodbye!' };
  },
  async requestPasswordReset(parent, args, ctx, info) {
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
  },
  async resetPassword(parent, args, ctx, info) {
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
  },
  async updatePermissions(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) throw new Error('You must be logged in!');

    const currentUser = await ctx.db.query.user({
      where: { id: userId }
    }, info);

    // requester has permission to do this?
    hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);

    // update permission
    return ctx.db.mutation.updateUser({
      where: { id: args.userId },
      data: {
        permissions: { set: args.permissions }
      },
    }, info);
  }
};


module.exports = UserMutations;
