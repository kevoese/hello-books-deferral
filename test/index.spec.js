const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index');

chai.use(chaiHttp);
const { expect } = chai;

const add = 2 + 2;
describe('Sample Test', () => {
  it('Add number', () => {
    expect(add).to.eql(4);
  });
});
describe('APP HOST /', () => {
  it('should return Hello Books Deferral', async () => {
    try {
      const res = await chai.request(app).get('/');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.include('Hello Books Deferral');
    } catch (e) {
      console.error(e);
    }
  });
});
