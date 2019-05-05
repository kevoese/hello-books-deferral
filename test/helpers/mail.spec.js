const chai = require("chai");
const chaiHttp = require("chai-http");
const Mail = require("../../server/helper/mail");

chai.use(chaiHttp);
const { expect } = chai;
chai.should();

// tests for The Mail class
describe("The Mail class", () => {
  let mailTest;
  let mailTestNoSubject;
  beforeEach(() => {
    // create a new instance of the Mail object with a subject
    mailTest = new Mail("Email Verification");

    // create a new instance of the Mail object without a subject
    mailTestNoSubject = new Mail();
  });
  // sample data to use as body of the  mail
  const data = {
    name: "John",
    link: "somelinktoverifyuser"
  };

  it("Should fail if no recipient is specified", () => {
    return mailTest
      .message(
        `
        Hi ${data.name},
        Verify via this link ${data.link}
      `
      )
      .send()
      .then(() => {})
      .catch(err => {
        expect(err.message.toString()).to.be.equal(
          "Provide at least one of to, cc or bcc"
        );
      });
  });
  it("Should fail if a wrong recipient email is specified", () => {
    return mailTest
      .to("sample")
      .message(
        `
        Hi ${data.name},
        Verify via this link ${data.link}
      `
      )
      .send()
      .then(() => {})
      .catch(err => {
        expect(err.message.toString()).to.be.equal("Bad Request");
        expect(err.response.body.errors[0].message).to.be.equal(
          "Does not contain a valid address."
        );
      });
  });
  it("Should fail if mail body is not a string ", () => {
    return mailTest
      .to("sample@mail.com")
      .message(data)
      .send()
      .then(() => {})
      .catch(err => {
        expect(err.message.toString()).to.be.equal(
          "String expected for `html`"
        );
      });
  });
  it("Should fail if subject of a mail is not specified", () => {
    return mailTestNoSubject
      .to("sample@mail.com")
      .message(
        `
        Hi ${data.name},
        Verify via this link ${data.link}
      `
      )
      .send()
      .then(() => {})
      .catch(err => {
        expect(err.message.toString()).to.be.equal("Bad Request");
        expect(err.code.toString()).to.be.equal("400");
      });
  });
  it("Should be successfull if a recipient is specified", () => {
    return mailTest
      .to("john@mail.com")
      .message(
        `
        Hi ${data.name},
        Verify via this link ${data.link}
      `
      )
      .send()
      .then(res => {
        res[0].should.have.status(202);
      });
  });
  it("Should be able to send mail to multiple recipients", () => {
    return mailTest
      .to(["john@mail.com", "jane@mail.com", "tony@mail.com"])
      .message(
        `
        Hi ${data.name},
        Verify via this link ${data.link}
      `
      )
      .send()
      .then(res => {
        res[0].should.have.status(202);
      });
  });
});
