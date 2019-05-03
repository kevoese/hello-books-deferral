// enable env for use
require('dotenv').config();

module.exports = {
  // coniguration for sendGrid
  SendGrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    extra: {}
  }
};
