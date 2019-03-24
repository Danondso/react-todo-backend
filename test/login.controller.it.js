import chai from 'chai';
import Server from '../server';
import request from 'supertest';
import logger from 'pino';
import assert from 'assert';

var log = logger();

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
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(200, res.status);
        });
    });

    // it('Should return 401 with invalid email passed in.', () => {
    //   request(Server)
    //     .post('/api/v1/signup')
    //     .send({
    //       firstName: 'Test',
    //       lastName: 'User',
    //       handle: 'nobody',
    //       email: 'dublin.anondson',
    //       password: 'aBrandNewUser',
    //     })
    //     .end(function(err, res) {
    //       if (err) {
    //         log.info(err);
    //       }
    //       assert.strictEqual(422, res.status);
    //     });
    // });

    it('Should return 400 with an empty payload', () => {
      request(Server)
        .post('/api/v1/signup')
        .send({})
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(400, res.status);
          assert.strictEqual('Body was empty.', res.body.message);
        });
    });

    it('Should return 400 with a null payload', () => {
      request(Server)
        .post('/api/v1/signup')
        .send(null)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(400, res.status);
          assert.strictEqual('Body was empty.', res.body.message);
        });
    });
  });
});
