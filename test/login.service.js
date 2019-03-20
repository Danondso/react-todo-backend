import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

describe('login', () => {
  it('should get all examples', () =>
    request(Server)
      .post('/api/v1/signup')
      .body()
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an.an('array')
          .of.length(2);
      }));
});
