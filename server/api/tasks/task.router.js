import * as express from 'express';
import taskController from './tasks.controller';
import { authenticationRequired } from '../authentication/authentication.service';

export default express
  .Router()
  .post('/tasks', authenticationRequired, taskController.saveTask)
  .put('/tasks/:id', authenticationRequired, taskController.updateTask)
  .delete('/tasks/:id', authenticationRequired, taskController.deleteTask)
  .get('/tasks/:email', authenticationRequired, taskController.getTasks);
