import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
let should = chai.should();
describe('Login', () => {
  // Checking if the API works
  it('It should be an object', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .type('form')
      .end((error, result) => {
        result.body.should.be.an('object');
        done();
      });
  });
  it('It should contain status', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .type('form')
      .end((error, result) => {
        result.body.should.have.property('status');
        done();
      });
  });
  // Checking if the wrong email ./ password will not works
  it('It should not login (Invalid password)',(done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .type('form')
      .send({ email: 'yvesndagije@gmail.com', password: 'yves' })
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(406);
        done();
      });
  });
  it('It should not login (Invalid email)',(done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .type('form')
      .send({ email: 'yvesndagije@gmail.co', password: 'yves@1' })
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(406);
        done();
      });
  });
  it('It should not login (Empty text)',(done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .type('form')
      .send({ email: '', password: '' })
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(406);
        done();
      });
  });
  // Checking if the right information can login
  it('It should login',(done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .type('form')
      .send({ email: 'yvesndagije@gmail.com', password: 'yves@1' })
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        done();
      });
  });
  // Checking if when you login you get the token to be used in the future activity
  it('It should have token',(done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .type('form')
      .send({ email: 'yvesndagije@gmail.com', password: 'yves@1' })
      .end((error, result) => {
        result.body.should.have.property('data').have.property('token');
        done();
      });
  });
});
