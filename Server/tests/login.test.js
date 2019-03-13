import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
let should = chai.should();
describe('Login', () => {
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
