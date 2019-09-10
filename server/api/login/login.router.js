import * as express from 'express';
import loginController from './login.controller';
import cors from 'cors';

var corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'POST',
  allowedHeaders: 'authorization',
  credentials: true,
};

export default express
  .Router()
  .post('/signup', cors(corsOptions), loginController.signup);
