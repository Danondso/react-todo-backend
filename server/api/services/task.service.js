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
        return this.convertTaskToDto(result);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  convertTaskToDto(result) {
    let taskData = {
      project: result.project,
      id: result._id,
      email: result.email,
      text: result.text,
      createdTime: result.createdTime,
    };
    return taskData;
  }
}

export default new TaskService();
