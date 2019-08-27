import LoginDatabase from './login.db.service';
import logger from 'pino';

var log = logger();
class TaskService {
  saveTask(newTask) {
    log.info('Saving task');
    //validate logic here.
    return LoginDatabase.insertTask(newTask)
      .then(result => {
        return result;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}

export default new TaskService();
