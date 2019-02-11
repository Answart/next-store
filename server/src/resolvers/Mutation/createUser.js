const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const maxAge = 1000 * 60 * 60 * 24 * 365;


module.exports = async function createUser(parent, args, ctx, info) {
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
};
