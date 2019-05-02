const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server/index');

const { apiURL } = global;

chai.use(chaiHttp);
const { expect } = chai;

describe('Add Author', () => {
  it('it should be able successfully add an author', (done) => {
    const data = {
      name: 'Micheal Angelo',
    };
    chai.request(server)
      .post(`${apiURL}/authors`).send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('body');
        done();
      });
  });
});
