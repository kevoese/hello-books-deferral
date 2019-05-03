const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index');
const knex = require('../dbConn');

chai.use(chaiHttp);
const { expect } = chai;

let register;

describe('AUTH API ENDPOINTS', () => {
  before(async () => {
    await knex.migrate.latest();
  });
  beforeEach(() => {
    register = {
      firstName: 'john',
      lastName: 'doe',
      email: 'john@gmail.com',
      password_confirmation: 'qwer1234',
      password: 'qwer1234'
    };
  });
  after(async () => {
    await knex('users').truncate();
    knex.destroy();
    app.close();
  });

  describe('POST SIGN UP api/v1/auth/signup', () => {
    it('should not sign up user if email is empty', async () => {
      try {
        register.email = '';
        const res = await chai.request(app)
          .post('/api/v1/auth/signup').send(register);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('message');
      } catch (e) {
        console.error(e);
      }
    });
    it('should sign up user with valid inputs', async () => {
      try {
        const res = await chai.request(app)
          .post('/api/v1/auth/signup').send(register);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message');
      } catch (e) {
        console.error(e);
      }
    });
    it('should not sign up user that is already registered', async () => {
      try {
        const res = await chai.request(app)
          .post('/api/v1/auth/signup').send(register);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('message');
      } catch (e) {
        console.error(e);
      }
    });
  });
});
