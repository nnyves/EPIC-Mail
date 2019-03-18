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
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
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
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
        .type('form')
        .send({email: 'yvesndagije@gmail.com', subject: 'Hi', message: 'This is to say hi'})
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(200);
          done();
        });
    });
    it('Should return a message object when send message', (done) => {
      chai.request(app)
        .post('/api/v1/messages/')
        .type('form')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
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
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        done();
      });
  });
  it('Should get array containing message element', (done) => {
    chai.request(app)
      .get('/api/v1/messages/')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        result.body.should.have.property('data').to.not.be.empty;
        done();
      });
  });
  it('Should return a message object', (done) => {
    chai.request(app)
      .get('/api/v1/messages/')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
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

describe('Reading unread', () => {
  it('Should not read message if not authenticated', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(401);
        result.body.should.have.property('errors').with.lengthOf(1);
        done();
      });
  });
  it('Should send message if all require meet', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        done();
      });
  });
  it('Should get array containing message element', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        result.body.should.have.property('data').to.not.be.empty;
        done();
      });
  });
  it('Should return a message object', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
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
describe('Reading draft', () => {
  it('Should not read message if not authenticated', (done) => {
    chai.request(app)
      .get('/api/v1/messages/draft')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(401);
        result.body.should.have.property('errors').with.lengthOf(1);
        done();
      });
  });
  it('Should send message if all require meet', (done) => {
    chai.request(app)
      .get('/api/v1/messages/draft')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        done();
      });
  });
  it('Should get array containing message element', (done) => {
    chai.request(app)
      .get('/api/v1/messages/draft')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        result.body.should.have.property('data').to.not.be.empty;
        done();
      });
  });
  it('Should return a message object', (done) => {
    chai.request(app)
      .get('/api/v1/messages/draft')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
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
describe('Deteting message', () => {
  it('Should not read message if not authenticated', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/1')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(401);
        result.body.should.have.property('errors').with.lengthOf(1);
        done();
      });
  });
  it('Should delete message if all require meet', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/1')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
      .end((error, result) => {
        result.body.should.have.property('status').with.equal(200);
        done();
      });
  });
  it('Should not delete message which does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/3')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
      .end((error, result) => {
        result.body.should.have.property('status').with.not.equal(200);
        done();
      });
  });
  describe('Reading sent message', () => {
    it('Should not read message if not authenticated', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(401);
          result.body.should.have.property('errors').with.lengthOf(1);
          done();
        });
    });
    it('Should send message if all require meet', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(200);
          done();
        });
    });
    it('Should get array containing message element', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(200);
          result.body.should.have.property('data').to.not.be.empty;
          done();
        });
    });
    it('Should return a message object', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
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
  describe('Reading Single message', () => {
    it('Should not read message if not authenticated', (done) => {
      chai.request(app)
        .get('/api/v1/messages/0')
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(401);
          result.body.should.have.property('errors').with.lengthOf(1);
          done();
        });
    });
    it('Should get message if all require meet', (done) => {
      chai.request(app)
        .get('/api/v1/messages/0')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(200);
          done();
        });
    });
    it('Should get array containing message element', (done) => {
      chai.request(app)
        .get('/api/v1/messages/0')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
        .end((error, result) => {
          result.body.should.have.property('status').with.equal(200);
          result.body.should.have.property('data').to.not.be.empty;
          done();
        });
    });
    it('Should return a message object', (done) => {
      chai.request(app)
        .get('/api/v1/messages/0')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
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
    it('Should get error if message does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/messages/3')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTUyODk5MzkwfQ.6XlR857ypV-lPbFRQt_pIYSESEZciSOeOUyiJ8rMlvM')
        .end((error, result) => {
          result.body.should.have.property('status').with.not.equal(200);
          done();
        });
    });
  });
});