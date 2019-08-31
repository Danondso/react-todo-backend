import loginRouter from './api/login/loginRouter';
import taskRouter from './api/tasks/taskRouter';

export default function routes(app) {
  app.use('/api/v1/', loginRouter);
  app.use('/api/v1/', taskRouter);
}
