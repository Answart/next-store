const nodemailer = require('nodemailer');


const options = process.env.NODE_ENV === 'development'
? {
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  }
: {
    host: process.env.POSTMARK_HOST,
    port: process.env.POSTMARK_PORT,
    auth: {
      user: process.env.POSTMARK_USER,
      pass: process.env.POSTMARK_PASS
    }
  }

const transport = nodemailer.createTransport({ ...options });


exports.transport = transport;
