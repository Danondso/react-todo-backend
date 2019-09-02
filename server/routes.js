import loginRouter from './api/login/login.router';
import taskRouter from './api/tasks/task.router';

export default function routes(app) {
  app.use('/api/v1/', loginRouter);
  app.use('/api/v1/', taskRouter);
}
