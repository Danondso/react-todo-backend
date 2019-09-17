import * as express from 'express';
import taskController from './tasks.controller';
import { authenticationRequired } from '../authentication/authentication.service';

export default express
  .Router()
  .post('/task', authenticationRequired, taskController.saveTask)
  .put('/task/:id', authenticationRequired, taskController.updateTask)
  .delete('/task/:id', authenticationRequired, taskController.deleteTask)
  .get('/:email/tasks', authenticationRequired, taskController.getTasks);
