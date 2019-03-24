import chai from 'chai';
import Server from '../server';
import request from 'supertest';

const expect = chai.expect;

describe('Login controller test', function() {
  describe('Signup Endpoints Tests', function() {
    it('Should return 200 on happy path user signup', () => {
      request(Server)
        .post('/api/v1/signup')
        .send({
          firstName: 'Dublin',
          lastName: 'Anondson',
          handle: 'pinknobody',
          email: 'dublin.anondson@gmail.com',
          password: 'testPasswordBecauseFakeApp',
        })
        .expect('Content-Type', /json/);
    });
  });
});
