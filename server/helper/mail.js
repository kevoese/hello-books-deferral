const SendGrid = require("@sendgrid/mail");
const config = require("../../mail.config");

/**
 * Mail class for sending mail
 * @chainable
 */
class Mail {
  /**
   * @param {string} subject
   */
  constructor(subject) {
    this.payload = {
      subject
    };
  }

  /**
   * get recipient email
   * mail can be sent to multiple recipient
   * @param {array} email
   * @returns {object} this
   */
  to(email) {
    this.payload.email = email;
    return this;
  }

  /**
   * get mail data
   * @param {string} data
   * @returns {object} this
   */
  message(data) {
    this.payload.message = data;
    return this;
  }

  /**
   * send email to user
   * using SendGrid
   * @returns {Promise}
   */
  send() {
    SendGrid.setApiKey(config.SendGrid.apiKey);
    const msg = {
      to: this.payload.email,
      from: "hello-books@andela.com",
      subject: this.payload.subject,
      html: this.payload.message
    };
    return SendGrid.send(msg);
  }
}
module.exports = Mail;
