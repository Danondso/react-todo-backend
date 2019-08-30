import * as express from 'express';
import loginController from './login/login.controller';
import taskController from './tasks/tasks.controller';

export default express
  .Router()
  .post('/login', loginController.login)
  .post('/signup', loginController.signup)
  .post('/task', taskController.saveTask)
  .put('/task/{id}', taskController.updateTask)
  .delete('/task/{id}', taskController.deleteTask);
