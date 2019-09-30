import request from 'supertest';
import Server from '../server';
import logger from 'pino';
import assert from 'assert';
var log = logger();

const accessToken =
  'Bearer eyJraWQiOiJhZlNJeU8xMTJrSzlkdnRFWmkxYnd1Z1FsRE5xR0pTMlVEWFRiQTBCZDBFIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHUxYXllMWdldlVxdHhLbTM1NyIsImVtYWlsIjoiZHVibGluLmFub25kc29uQGdtYWlsLmNvbSIsInZlciI6MSwiaXNzIjoiaHR0cHM6Ly9kZXYtNzY5MDUyLm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiMG9hMWF5ZnprcENrakMzeTEzNTciLCJpYXQiOjE1Njk4MDQyMjUsImV4cCI6MTU2OTgwNzgyNSwianRpIjoiSUQuTDFLTEJRN3YzRFh6Tk9DY3MtRkd6Ung0TkhvdjA3RXFnWDl3X0tXQVBfZyIsImFtciI6WyJwd2QiXSwiaWRwIjoiMDBvMWF5ZTFkY0wxRTlZT0ozNTciLCJub25jZSI6Ilh5RElpSUZKWEVaYkhGQXFxa2ZLNEc3NUdKcTR2MjFiRmowTm5DNEhfNWZvZiIsImF1dGhfdGltZSI6MTU2OTgwNDIyNCwiYXRfaGFzaCI6IjI3dUIxY2NWa0xDbXNTTTUydGNoM2cifQ.FcsT1ES2GV8Axj5rJTLhLf14VUWPWLCJgHXRuUcUshTh3Jsk-DrQRmnQz4bWD_gYsfoj1QKQd6S-0gVUlZz31LTQQbRHzXSgTyElua_SRUwKB4gq6oSAWLNfHwm6rdF7eHRLwr4CHPCNt2zfI4teMi5zekv3BniGYj20XQvbQsp6g5bHH6SaISCTMNRF3K0qhj_f7Rf82LfOV0qGX5y7Okxj9viMhu-tepPL_-d-fqx9FORONzI-vPWN8QmOYAYlI_acLkECP3OpwSLK6Zv-bH_M3B6uaK4cdWrwlthEcKCh7oFmVKnPi3NnhmDUuXUzybN7SK-YjUQ_c6qTZelWgA';

describe('Task IT Tests', function() {
  describe('Task Save Endpoint Tests', function() {
    it('Should return 200 with result on task save.', () => {
      request(Server)
        .post('/api/v1/task')
        .set('Authorization', accessToken)
        .set('Content-Type', 'application/json')
        .send({
          project: 'Work',
          email: 'dublin.smith@gmail.com',
          text: 'Write tests that are good.',
        })
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(200, res.status);
          log.info('RESULT', res);
        });
    });

    it('Should return 400 with an empty payload', () => {
      request(Server)
        .post('/api/v1/task')
        .set('Authorization', accessToken)
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
        .post('/api/v1/task')
        .set('Authorization', accessToken)
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

  describe('Get Tasks Endpoint Tests', function() {
    it('Should return 200 when task retrieval succeeds.', () => {
      request(Server)
        .get('/api/v1/dublin.smith@gmail.com/tasks')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(200, res.status);
          assert.strictEqual([], res.body.data);
        });
    });

    it('Should return 500 when task retrieval fails.', () => {
      request(Server)
        .get('/api/v1/geafadfa/tasks')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(500, res.status);
        });
    });
  });

  describe('Update Task Endpoint Tests', function() {
    it('Should return 204 when a task is updated successfully.', () => {
      request(Server)
        .put('/api/v1/task/aVeryUniqueId')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(204, res.status);
        });
    });

    it('Should return 400 when the task id is null', () => {
      request(Server)
        .put('/api/v1/task/null')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(400, res.status);
        });
    });

    it('Should return 400 when the task id is undefined', () => {
      request(Server)
        .put('/api/v1/task/undefined')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(400, res.status);
        });
    });

    it('Should return 500 when a task is not updated successfully.', () => {
      request(Server)
        .put('/api/v1/task/aVeryUniqueId')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(500, res.status);
        });
    });
  });

  describe('Delete Task Endpoint Tests', function() {
    it('Should return 204 when a task is deleted successfully.', () => {
      request(Server)
        .delete('/api/v1/task/aVeryUniqueId')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(204, res.status);
        });
    });

    it('Should return 400 when the task id is null', () => {
      request(Server)
        .delete('/api/v1/task/null')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(400, res.status);
        });
    });

    it('Should return 400 when the task id is undefined', () => {
      request(Server)
        .delete('/api/v1/task/undefined')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(400, res.status);
        });
    });

    it('Should return 500 when a task is not deleted successfully.', () => {
      request(Server)
        .delete('/api/v1/task/aVeryUniqueId')
        .set('Authorization', accessToken)
        .end(function(err, res) {
          if (err) {
            log.info(err);
          }
          assert.strictEqual(500, res.status);
        });
    });
  });

});
