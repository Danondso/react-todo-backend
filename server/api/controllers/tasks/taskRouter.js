import * as express from 'express';
import taskController from './tasks.controller';

export default express
  .Router()
  .post('/task', taskController.saveTask)
  .put('/task/:id', taskController.updateTask)
  .delete('/task/:id', taskController.deleteTask)
  .get('/:email/tasks', taskController.getTasks);
