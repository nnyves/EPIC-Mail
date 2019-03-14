import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();
describe('Message Creation', () => {
    it('Should not create message if not authenticated', (done) => {
      chai.request(app)
        .post('/api/v1/messages/')
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(401);
          result.body.should.have.property('errors').with.lengthOf(1);
          done();
        });
    });
    it('Should validate information', (done) => {
      chai.request(app)
        .post('/api/v1/messages/')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUyNTY1ODc1fQ.In5qfM-yH8P5DSF7fRh63oswK98bpiOZqPmP_WLg8w4')
        .type('form')
        .send({email: 'ybb', subject: ''})
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(406);
          result.body.should.have.property('errors').with.lengthOf(3);
          done();
        });
    });
    it('Should send message if all require meet', (done) => {
      chai.request(app)
        .post('/api/v1/messages/')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUyNTY1ODc1fQ.In5qfM-yH8P5DSF7fRh63oswK98bpiOZqPmP_WLg8w4')
        .send({email: 'yvesndagije@gmail.com', subject: 'Hi', message: 'This is to say hi'})
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(200);
          done();
        });
    });
    it('Should return a message object when send message', (done) => {
      chai.request(app)
        .post('/api/v1/messages/')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUyNTY1ODc1fQ.In5qfM-yH8P5DSF7fRh63oswK98bpiOZqPmP_WLg8w4')
        .send({email: 'yvesndagije@gmail.com', subject: 'Hi', message: 'This is to say hi'})
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(200);
          result.body.should.have.nested.property('data[0].id');
          result.body.should.have.nested.property('data[0].message');
          result.body.should.have.nested.property('data[0].subject');
          result.body.should.have.nested.property('data[0].createdOn');
          result.body.should.have.nested.property('data[0].status');
          done();
        });
    });
  });

describe('Reading inbox', () => {
  it('Should not read message if not authenticated', (done) => {
    chai.request(app)
      .get('/api/v1/messages/')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(401);
        result.body.should.have.property('errors').with.lengthOf(1);
        done();
      });
  });
  it('Should send message if all require meet', (done) => {
    chai.request(app)
      .get('/api/v1/messages/')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUyNTY1ODc1fQ.In5qfM-yH8P5DSF7fRh63oswK98bpiOZqPmP_WLg8w4')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        done();
      });
  });
  it('Should get array containing message element', (done) => {
    chai.request(app)
      .get('/api/v1/messages/')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUyNTcyMjg5fQ.kYERJFk3SBBE4OB8vsT8mlfozKdIqxnO4WGQ3rz8Ng0')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        result.body.should.have.property('data').to.not.be.empty;
        done();
      });
  });
});
