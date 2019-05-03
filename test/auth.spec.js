const chai = require('chai');
const chaiHttp = require('chai-http');
const { server, dbConn } = require('../server/index');

chai.use(chaiHttp);
const { expect } = chai;

let register;

describe('AUTH API ENDPOINTS', () => {
  before(async () => {
    await dbConn.migrate.latest();
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
    await dbConn('users').truncate();
    dbConn.destroy();
    server.close();
  });

  describe('POST SIGN UP api/v1/auth/signup', () => {
    it('should not sign up user if email is empty', async () => {
      register.email = '';
      const res = await chai.request(server)
        .post('/api/v1/auth/signup').send(register);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('message');
      expect(res.body[0].message).to.include('email is required to create a new account');
    });
    it('should sign up user with valid inputs', async () => {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup').send(register);
      expect(res).to.have.status(201);
      expect(res.body[0]).to.have.property('message');
      expect(res.body[0].message).to.include('User registered');
    });
    it('should not sign up user that is already registered', async () => {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup').send(register);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('message');
      expect(res.body[0].message).to.include('email must be unique');
    });
  });
});
