import DoerRepository from '../services/db.service';
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

  getTasks(email) {
    log.info('Retrieving tasks for email: ', email);
    return DoerRepository.findTasksByEmail(email)
      .then(results => {
        let resultsList = [];
        results.forEach(result => {
          resultsList.push(this.convertTaskToDto(result));
        });
        return resultsList;
      })
      .catch(error => {
        log.info(error);
        throw new Error(error);
      });
  }

  updateTask(id, updatedTask) {
    log.info('Updating task with id: ', updatedTask.id);
    return DoerRepository.updateTask(id, updatedTask)
      .then(result => {
        log.debug('Result from updating task', result);
        return;
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  deleteTask(id) {
    log.info('Deleting task with id', id);
    return DoerRepository.deleteTask(id)
      .then(() => {
        return;
      })
      .catch(error => {
        log.info('Error occurred while deleting task with id ', id, '.');
        return error;
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
