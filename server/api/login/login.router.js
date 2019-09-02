import * as express from 'express';
import loginController from './login.controller';

export default express
  .Router()
  .post('/login', loginController.login)
  .post('/signup', loginController.signup);
