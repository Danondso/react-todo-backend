import { LoginDatabase } from './login.db.service';
import logger from 'pino';

var log = logger();
class TaskService {
  saveTask(newTask) {
    log.info('Saving task');
    //validate logic here.
    return LoginDatabase.saveTask(newTask);
  }
}

export default new TaskService();
