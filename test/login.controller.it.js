import request from 'supertest';
import Server from '../server';
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
          handle: 'pinknobodyTwo',
          email: 'dublin.smith@gmail.com',
          password: 'testPasswordBecauseFakeApp',
        })
        .end(function(err, res) {
          if (err) {
            log.info('HAPPY PATH BODY TEST ', res.body);

            log.info(err);
          }
          log.info('HAPPY PATH BODY TEST ', res.body);
          assert.strictEqual(201, res.status);
        });
      //TODO can I get the payload out of the database to check it here? Would beef the test up way much

      //TODO duplicate signup payloads, reject then next one.
    });

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

  describe('Payload validation tests.', function() {
    it('Should return 422 when the signup payload is invalid.', () => {
      request(Server)
        .post('/api/v1/signup')
        .send({
          firstName: '',
          lastName: 'User',
          handle: 'nobody',
          email: 'dublin.anondson@gmail.com',
          password: 'aBrandNewUser',
        })
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(422, res.status);
          assert.strictEqual(
            'firstName is a required field.',
            res.body.message
          );
        });

      request(Server)
        .post('/api/v1/signup')
        .send({
          firstName: 'testUser',
          lastName: '',
          handle: 'nobody',
          email: 'dublin.anondson@gmail.com',
          password: 'aBrandNewUser',
        })
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(422, res.status);
          assert.strictEqual('lastName is a required field.', res.body.message);
        });

      request(Server)
        .post('/api/v1/signup')
        .send({
          firstName: 'testUser',
          lastName: 'lastNameUser',
          handle: '',
          email: 'dublin.anondson@gmail.com',
          password: 'aBrandNewUser',
        })
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(422, res.status);
          assert.strictEqual('handle is a required field.', res.body.message);
        });

      request(Server)
        .post('/api/v1/signup')
        .send({
          firstName: 'testUser',
          lastName: 'lastNameUser',
          handle: 'nobody',
          email: 'dublin.anondson',
          password: 'aBrandNewUser',
        })
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(422, res.status);
          assert.strictEqual('email is invalid.', res.body.message);
        });

      request(Server)
        .post('/api/v1/signup')
        .send({
          firstName: 'testUser',
          lastName: 'lastNameUser',
          handle: 'nobody',
          email: '',
          password: 'aBrandNewUser',
        })
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(422, res.status);
          assert.strictEqual('email is invalid.', res.body.message);
        });

      request(Server)
        .post('/api/v1/signup')
        .send({
          firstName: 'testUser',
          lastName: 'lastNameUser',
          handle: 'nobody',
          email: 'testemail@dogpile.net',
          password: '',
        })
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(422, res.status);
          assert.strictEqual('password is a required field.', res.body.message);
        });
    });
  });
});
