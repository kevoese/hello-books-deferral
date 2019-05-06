const chai = require("chai");
const chaiHttp = require("chai-http");
const { server, databaseConnection } = require("../server/index");

chai.use(chaiHttp);
const { expect } = chai;

let register;

describe("AUTH API ENDPOINTS", () => {
  before(async () => {
    await databaseConnection.migrate.latest();
  });
  beforeEach(() => {
    register = {
      firstName: "john",
      lastName: "doe",
      email: "john@gmail.com",
      password_confirmation: "qwer1234",
      password: "qwer1234"
    };
  });
  after(async () => {
    await databaseConnection("users").truncate();
    databaseConnection.destroy();
    server.close();
  });

  describe("POST SIGN UP api/v1/auth/signup", () => {
    it("should not sign up user if email is empty", async () => {
      register.email = "";
      const res = await chai
        .request(server)
        .post("/api/v1/auth/signup")
        .send(register);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("status");
      expect(res.body.status).to.include("error");
      expect(res.body).to.have.property("code");
      expect(res.body.code).to.be.an("array");
      expect(res.body.code[0]).to.have.property("message");
      expect(res.body.code[0].message).to.include(
        "email is required to create a new account"
      );
    });
    it("should sign up user with valid inputs", async () => {
      const res = await chai
        .request(server)
        .post("/api/v1/auth/signup")
        .send(register);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property("status");
      expect(res.body.status).to.include("success");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.be.an("object");
      expect(res.body.data).to.have.property("message");
      expect(res.body.data).to.have.property("token");
      expect(res.body.data.message).to.include("User registered");
    });
    it("should not sign up user that is already registered", async () => {
      const res = await chai
        .request(server)
        .post("/api/v1/auth/signup")
        .send(register);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("status");
      expect(res.body.status).to.include("error");
      expect(res.body).to.have.property("code");
      expect(res.body.code).to.be.an("array");
      expect(res.body.code[0]).to.have.property("message");
      expect(res.body.code[0].message).to.include("email must be unique");
    });
  });

  describe("POST ADD AN AUTHOR api/v1/authors", () => {
    it("should addd a new author", done => {
      data = {
        name: "John Doe"
      };
      chai
        .request(server)
        .post("/api/v1/authors")
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("status");
          done();
        });
    });

    it("should not add an author if name field is empty", async () => {
      data.name = "";
      const res = await chai
        .request(server)
        .post("/api/v1/authors")
        .send(data);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("status");
      expect(res.body.status).to.include("error");
      expect(res.body).to.have.property("code");
      expect(res.body.code).to.be.an("array");
      expect(res.body.code[0]).to.have.property("message");
      expect(res.body.code[0].message).to.include(
        "name is required to create an author"
      );
    });
  });
});
