import DoerRepository from './login.db.service';
import logger from 'pino';

var log = logger();
class TaskService {
  saveTask(newTask) {
    log.info('Saving task');
    //validate logic here.
    return DoerRepository.insertTask(newTask)
      .then(result => {
        log.info('result ', result);
        return result;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}

export default new TaskService();
