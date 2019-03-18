import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();
describe('Authentication checker', () => {
  // Checking if the API exists 
  it('Should not authincate if he does not provide token', (done) => {
    chai.request(app)
      .post('/api/v1/messages/')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(401);
        result.body.should.have.property('errors').with.lengthOf(1);
        done();
      });
  });
  // Checking if it accept invalid token
  it('Should not authincate if he provide invalid token', (done) => {
    chai.request(app)
      .post('/api/v1/messages/')
      .set('token','invalid-token')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(406);
        result.body.should.have.property('errors').with.lengthOf(1);
        done();
      });
  });
  // Checking if the right token can  authenticate
  it('Should authincate if provided valid token', (done) => {
    chai.request(app)
      .post('/api/v1/messages/')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUyNTY1ODc1fQ.In5qfM-yH8P5DSF7fRh63oswK98bpiOZqPmP_WLg8w4')
      .end((error, result) => {
        result.body.should.have.property('status').with.not.equal(401);
        result.body.should.have.property('errors').with.not.include('Invalid token');
        done();
      });
  });
});