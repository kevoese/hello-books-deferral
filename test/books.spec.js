import faker from "faker";
import Book from "@models/Book";
import supertest from "supertest";
import { app, databaseConnection } from "@server/app";

const server = () => supertest(app);
const booksRoute = "/api/v1/books";

const getBook = () => ({
  title: "Fine Boys",
  coverType: "PaperBack",
  isbn: "9789785205862",
  description:
    "A novel depicting the real life story of Eghosa and his Warri friends...",
  publisher: "Farfina Kachifo",
  year: 2014
});

describe("BOOK API ENDPOINTS", () => {
  beforeAll(async () => {
    await databaseConnection.migrate.latest();
  });

  afterAll(async () => {
    await databaseConnection("books").truncate();
    server.close();
  });

  describe("ADD BOOKS API ENDPOINT", () => {
    it.only("should be able to add a book", async () => {
      const fineBoys = getBook();
      fineBoys.isbn = "23ihnv3490nv920327";
      const { status, body } = await server()
        .post(`${booksRoute}`)
        .send(fineBoys);

      expect(status).toBe(201);
      expect(body).toMatchSnapshot();
    });

    it.only("should return validation errors if validation fails", async () => {
      const { status, body } = await server()
        .post(`${booksRoute}`)
        .send({});

      expect(status).toBe(422);
      expect(body).toMatchSnapshot();
    });
  });
});

describe("GET ALL BOOKS API ENDPOINT", () => {
  beforeAll(async () => {
    await databaseConnection.migrate.latest();
  });

  afterAll(async () => {
    await databaseConnection("books").truncate();
    server.close();
  });

  it.only("should return all books", async () => {
    const firstBook = getBook();
    firstBook.isbn = "128b4v389028074";
    const secondBook = getBook();
    secondBook.isbn = "9204798753002380";

    await Book.query().insert(firstBook);
    await Book.query().insert(secondBook);

    const { status, body } = await server().get(`${booksRoute}`);
    expect(status).toBe(200);

    expect(body).toMatchSnapshot();
  });

  it.only("should return the specified Books data", async () => {
    const theBook = getBook();
    theBook.isbn = "23895u0174-82";

    await Book.query().insert(theBook);

    const { status, body } = await server().get(`${booksRoute}/1`);

    expect(status).toBe(200);
    expect(Object.keys(body.data)).toMatchSnapshot();
  });

  it.only("should return message not exist when book requested doesnt exist", async () => {
    const { status, body } = await server().get(`${booksRoute}/987654`);

    expect(status).toBe(404);
    expect(body).toMatchSnapshot();
  });

  it.only("should return error when id passed in is not an integer", async () => {
    const { status, body } = await server().get(`${booksRoute}/ab`);

    expect(status).toBe(422);
    expect(body).toMatchSnapshot();
  });
});

describe("DELETE BOOK(S) API ENDPOINT", () => {
  beforeAll(async () => {
    await databaseConnection.migrate.latest();
  });

  afterAll(async () => {
    await databaseConnection("books").truncate();
    server.close();
  });

  it.only("should return success message when an existing book is deleted", async () => {
    const theBook = getBook();
    theBook.isbn = "230u10973872032";

    await Book.query().insert(theBook);

    const { status, body } = await server().delete(`${booksRoute}/1`);

    expect(status).toBe(200);
    expect(body).toMatchSnapshot();
  });

  it.only("should return message not exist when book requested does not exist", async () => {
    const { body, status } = await server().delete(`${booksRoute}/326879`);

    expect(status).toBe(404);
    expect(body).toMatchSnapshot();
  });

  it.only("should return error when id passed in is not an integer", async () => {
    const { body, status } = await server().delete(`${booksRoute}/ab`);

    expect(status).toBe(422);
    expect(body).toMatchSnapshot();
  });
});
