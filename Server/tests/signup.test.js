import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';



chai.use(chaiHttp);
describe('Register API Tests',() =>{
  it('It should be an object', (done) => {
    chai.request(app)
      .post('/api/v1/auth/register')
      .type('form')
      .end((error, result) => {
        result.body.should.be.an('object');
        done();
    });
  });
  it('It should contain status', (done) => {
    chai.request(app)
      .post('/api/v1/auth/register')
      .type('form')
      .end((error, result) => {
        result.body.should.have.property('status');
        done();
      });
  });
  it('It must validate user (Checking email, firstName)', (done) => {
    chai.request(app)
      .post('/api/v1/auth/register')
      .type('form')
      .send({ email: 'yvesnd', password: 'yves@1', lastName: 'Yves', firstName: '888Ndagi' })
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(406);
        result.body.should.have.property('errors').with.lengthOf(2);
        done();
      });
  });
  it('It must validate user (Checking password, lastName)', (done) => {
    chai.request(app)
      .post('/api/v1/auth/register')
      .type('form')
      .send({ email: 'yvesndagije@gmail.co', password: 'yves', lastName: 's8', firstName: 'Ndagijimana' })
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(406);
        result.body.should.have.property('errors').with.lengthOf(2);
        done();
      });
  })
  it('Should check the existance of the user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/register')
      .type('form')
      .send({ email: 'yvesndagije@gmail.com', password: 'yves@1', lastName: 'Yves', firstName: 'Ndagijimana' })
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(406);
        result.body.should.have.property('errors').with.lengthOf(1);
        done();
      });
  });
  it('Should allow registration to right information and give them tokens', (done) => {
    chai.request(app)
      .post('/api/v1/auth/register')
      .type('form')
      .send({ email: 'yves@gmail.com', password: 'yves@1', lastName: 'Yves', firstName: 'Ndagijimana' })
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        result.body.should.have.nested.property('data[0].token').to.be.a('String');
        done();
      });
  });
});