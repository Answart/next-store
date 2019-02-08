const nodemailer = require('nodemailer');


const options = (process.env.NODE_ENV === 'production')
  ? {
      host: process.env.POSTMARK_HOST,
      port: process.env.POSTMARK_PORT,
      auth: {
        user: process.env.POSTMARK_USER,
        pass: process.env.POSTMARK_PASS
      }
    }
  : {
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    }

const transport = nodemailer.createTransport({ ...options });

const emailFromNextStoreSupport = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>

    <p>- NextStore Support</p>
  </div>
`;


exports.transport = transport;
exports.emailFromNextStoreSupport = emailFromNextStoreSupport;
