const chai = require("chai");
const chaiHttp = require("chai-http");
const { server, databaseConnection } = require("../server/index");

chai.use(chaiHttp);
const { expect } = chai;

let author;

describe("AUTHOR API ENDPOINTS", () => {
  const success = async (res, statusCode, classType = "object") => {
    expect(res).to.have.status(statusCode);
    expect(res.body).to.have.property("status");
    expect(res.body.status).to.include("success");
    expect(res.body).to.have.property("data");
    expect(res.body.data).to.be.an(classType);
  };
  const fail = async (res, statusCode, message) => {
    expect(res).to.have.status(statusCode);
    expect(res.body).to.have.property("status");
    expect(res.body.status).to.include("error");
    expect(res.body.code).to.equal("ValidationFailed");
    expect(res.body.message[0]).to.have.property("message");
    expect(res.body.message[0].message).to.be.a("string");
    expect(res.body.message[0].message).to.include(message);
  };
  before(async () => {
    await databaseConnection.migrate.latest();
  });
  beforeEach(() => {
    author = { name: "john doe" };
  });
  after(async () => {
    await databaseConnection("authors").truncate();
  });

  describe("POST CREATE AUTHOR api/v1/authors", () => {
    it("should not create author if name field is empty", async () => {
      author.name = "";
      const res = await chai
        .request(server)
        .post("/api/v1/authors")
        .send(author);
      fail(res, 422, "name is required to create an author");
    });
    it("should create author with valid inputs", async () => {
      const res = await chai
        .request(server)
        .post("/api/v1/authors")
        .send(author);
      success(res, 201);
      console.log(res.body.data);
      expect(res.body.data).to.have.all.keys("name", "id");
    });
  });

  describe("GET AUTHOR api/v1/authors", () => {
    it("should not get author if id param is not a number", async () => {
      const res = await chai.request(server).get("/api/v1/authors/d");
      fail(res, 422, "id must be an integer");
    });
    it("should return single author with name query string", async () => {
      const res = await chai.request(server).get("/api/v1/authors/1");
      success(res, 200);
    });
  });

  describe("UPDATE AUTHOR api/v1/authors", () => {
    it("should not update author if name field is empty", async () => {
      author.name = "";
      const res = await chai
        .request(server)
        .patch("/api/v1/authors/1")
        .send(author);
      fail(res, 422, "name is required to update an author");
    });
    it("should update author with valid inputs", async () => {
      author.name = "jane doe";
      const res = await chai
        .request(server)
        .patch("/api/v1/authors/1")
        .send(author);
      success(res, 200);
      expect(res.body.data).to.have.all.keys("name", "id");
    });
  });

  describe("DELETE AUTHOR api/v1/authors", () => {
    it("should not delete author if id param is not a number", async () => {
      const res = await chai.request(server).delete("/api/v1/authors/d");
      fail(res, 422, "id must be an integer");
    });
    it("should delete author with id param valid", async () => {
      const res = await chai.request(server).delete("/api/v1/authors/1");
      success(res, 200, "object");
      expect(res.body.data).to.have.property("message");
      expect(res.body.data.message).to.include("Author deleted successfully");
    });
  });
});
