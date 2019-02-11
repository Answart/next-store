const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const maxAge = 1000 * 60 * 60 * 24 * 365;


module.exports = async function signin(parent, { email, password }, ctx, info) {
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
};
