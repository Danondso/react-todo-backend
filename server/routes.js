import loginRouter from './api/controllers/login/loginRouter';
import taskRouter from './api/controllers/tasks/taskRouter';

export default function routes(app) {
  app.use('/api/v1/', loginRouter);
  app.use('/api/v1/', taskRouter);
}
