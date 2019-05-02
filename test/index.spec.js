const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const add = 2 + 2;
describe('Sample Test', () => {
  it('Add number', () => {
    expect(add).to.eql(4);
  });
});
