import mongoose from 'mongoose';
import logger from 'pino';
import TaskModel from '../tasks/task.schema';
('use strict');
var log = logger();

export class DoerRepository {
  constructor() {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    mongoose.Promise = global.Promise; //Why set this up?
  }

  insertTask(newTask) {
    log.info('Inserting task', newTask);
    let task = this.createTask(newTask);
    log.info('Saving task', task);
    return task
      .save()
      .then(result => {
        log.info('Task inserted');
        return result;
      })
      .catch(error => {
        throw new Error('Unable to save task', error);
      });
  }

  findTasksByEmail(email) {
    return TaskModel.find({ email: email })
      .then(result => {
        return result;
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  updateTask(id, updatedTask) {
    log.info('Found task to update', id);
    return Promise.resolve(
      TaskModel.findById(id)
        .then(result => {
          result.project = updatedTask.project;
          result.text = updatedTask.text;

          return result.save().then(result => {
            return result._doc;
          });
        })
        .catch(error => {
          throw new Error(error);
        })
    );
  }

  deleteTask(id) {
    return TaskModel.deleteOne({ _id: id })
      .then(result => {
        log.info('Task with id', id, 'successfully deleted.');
        log.debug('Result: ', result);
        return;
      })
      .catch(error => {
        log.error('An error occurred while deleting task.', error);
        return error;
      });
  }

  createTask(newTask) {
    let createdTask = new TaskModel();
    createdTask.project = newTask.project;
    createdTask.id = mongoose.Types.ObjectId();
    createdTask.email = newTask.email;
    createdTask.text = newTask.text;
    createdTask.createdTime = new Date();
    return createdTask;
  }
}
export default new DoerRepository();
