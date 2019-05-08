const chai = require("chai");
const chaiHttp = require("chai-http");
const { server, databaseConnection } = require("../server/index");

chai.use(chaiHttp);

const { expect } = chai;

const booksRoute = "/api/v1/books";

const knexfile = require("./../knexfile")[process.env.NODE_ENV];

const fineBoys = {
  title: "Fine Boys",
  coverType: "PaperBack",
  isbn: "9789785205862",
  description:
    "A novel depicting the real life story of Eghosa and his Warri friends...",
  publisher: "Farfina Kachifo",
  year: 2014
};

describe("BOOKS API ENDPOINTS", () => {
  before(async () => {
    await databaseConnection.migrate.latest();
  });

  after(async () => {
    await databaseConnection("books").truncate();
    server.close();
  });

  it("should be able to add a book", async () => {
    const res = await chai
      .request(server)
      .post(`${booksRoute}`)
      .send(fineBoys)
      .set("Accept", "/application/json");

    expect(res).to.have.status(201);
    expect(res.body.status).to.include("success");
    expect(res.body.data.message).to.include(
      "Book has been added to the library"
    );
    expect(res.body.data.book.title).to.equal(fineBoys.title);
  });

  it("should return validation errors if validation fails", async () => {
    const res = await chai
      .request(server)
      .post(`${booksRoute}`)
      .send({})
      .set("Accept", "/application/json");

    expect(res).to.have.status(422);
    expect(res.body.code).to.equal("ValidationFailed");
    expect(res.body.message[0].message).to.equal(
      "title is required to create a book"
    );
  });
});

describe("GET ALL BOOKS API ENDPOINT", () => {
  it("should return all books", async () => {
    const res = await chai
      .request(server)
      .get("/api/v1/books")
      .set("Accept", "application/json");

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("data");
  });
});
