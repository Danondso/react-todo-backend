import loginRouter from './api/controllers/login/router';

export default function routes(app) {
  app.use('/api/v1/', loginRouter);
}
