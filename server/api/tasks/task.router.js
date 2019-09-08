import * as express from 'express';
import taskController from './tasks.controller';
import { authenticationRequired } from '../authentication/authentication.service';
import cors from 'cors';

var corsOptions = {
  origin: 'localhost',
  methods: 'POST. GET, PUT, DELETE',
  allowedHeaders: 'authorization',
  credentials: true,
};

export default express
  .Router()
  .post('/task', cors(), authenticationRequired, taskController.saveTask)
  .put('/task/:id', authenticationRequired, taskController.updateTask)
  .delete('/task/:id', authenticationRequired, taskController.deleteTask)
  .get('/:email/tasks', authenticationRequired, taskController.getTasks);
