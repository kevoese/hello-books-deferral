const chai = require("chai");
const chaiHttp = require("chai-http");
const Mail = require("friendly-mail");

chai.use(chaiHttp);
const { expect } = chai;
chai.should();

// tests for The Mail class
describe("The Mail class", () => {
  let mailTest;
  let mailTestNoSubject;
  beforeEach(() => {
    // create a new instance of the Mail class
    mailTest = new Mail("Email Verification");

    // create a new instance of the Mail object without a subject
    mailTestNoSubject = new Mail();
  });

  it.skip("Should fail if no recipient is specified", () => {
    return mailTest
      .to("")
      .data({
        name: "John",
        link: "somelinktoverifyuser"
      })
      .send()
      .then(() => {})
      .catch(err => {
        expect(err.message.toString()).to.be.equal("No recipients defined");
      });
  });
  it.skip("Should fail if subject of a mail is not specified", () => {
    return mailTestNoSubject
      .to("sample@mail.com")
      .data({
        name: "John",
        link: "somelinktoverifyuser"
      })
      .send()
      .then(() => {})
      .catch(err => {
        expect(err.message.toString()).to.be.equal("Bad Request");
        expect(err.code.toString()).to.be.equal("400");
      });
  });
  it.skip("Should be successfull if a recipient is specified", () => {
    return mailTest
      .to("john@mail.com")
      .subject("Test Mail Service")
      .data({
        name: "John",
        link: "somelinktoverifyuser"
      })
      .send()
      .then(res => {
        res.should.be.an("object");
        res.accepted[0].should.to.be.equal("john@mail.com");
      });
  });
});
