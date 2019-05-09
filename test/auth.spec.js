import faker from "faker";
import User from "@models/User";
import supertest from "supertest";
import { app, databaseConnection } from "@server/app";

const server = () => supertest(app);

describe("AUTH API ENDPOINTS", () => {
  const getUser = () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password_confirmation: "secret0001",
    password: "secret0001"
  });

  beforeAll(async () => {
    await databaseConnection.migrate.latest();
  });

  afterAll(async () => {
    await databaseConnection("users").truncate();
  });

  describe("POST SIGN UP api/v1/auth/signup", () => {
    it("should not sign up user if email is empty", async () => {
      const { status, body } = await server()
        .post("/api/v1/auth/signup")
        .send({
          ...getUser(),
          email: ""
        });

      expect(status).toBe(422);
      expect(body).toMatchSnapshot();
    });

    it.only("should sign up user with valid inputs", async () => {
      const user = getUser();
      const { status, body } = await server()
        .post("/api/v1/auth/signup")
        .send(user);

      expect(status).toBe(201);
      expect(body.data.user.email).toBe(user.email);
      expect(Object.keys(body.data)).toMatchSnapshot();
    });

    it("should not sign up user that is already registered", async () => {
      const user = getUser();
      await User.query().insert({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName
      });

      const { status, body } = await server()
        .post("/api/v1/auth/signup")
        .send(user);

      expect(status).toBe(422);
      expect(body).toMatchSnapshot();
    });
  });

  describe("POST ADD AN AUTHOR api/v1/authors", () => {
    test("should addd a new author", done => {
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

    test("should not add an author if name field is empty", async () => {
      data.name = "";
      const res = await chai
        .request(server)
        .post("/api/v1/authors")
        .send(data);
      expect(res).to.have.status(422);
      expect(res.body.status).to.include("error");
      expect(res.body.code).to.equal("ValidationFailed");
      expect(res.body.message).to.be.an("array");
      expect(res.body.message[0].message).to.include(
        "name is required to create an author"
      );
    });

    test("should not verify an email with a wrong verification code", async () => {
      const res = await chai
        .request(server)
        .post("/api/v1/auth/verify/:thisistherandomstring")
        .send();
      expect(res.body.status).to.include("error");
      expect(res).to.have.status(400);
      expect(res.body.code).to.be.an("object");
      expect(res.body.code.error).to.equal("Bad Request");
    });

    test("should verify an email with a good verification code", async () => {
      const thisUser = await User.query().where("email", register.email);
      const verificationCode = thisUser[0].email_confirm_code;
      const res = await chai
        .request(server)
        .post(`/api/v1/auth/verify/${verificationCode}`)
        .send();
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("status");
      expect(res.body.status).to.include("success");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.be.an("object");
      expect(res.body.data).to.have.property("message");
      expect(res.body.data.message).to.include("User verified");
    });
  });
});
