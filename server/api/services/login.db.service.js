import mongoose from 'mongoose';
import logger from 'pino';
import UserModel from './schemas/user.schema';
import TaskModel from './schemas/task.schema';
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
        log.info('DID WE MAKE IT HERE?', error);
        throw new Error('Unable to save task ', error);
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
    log.info('Found task', id);
    let task = TaskModel.findById(id);
    task.project = updatedTask.project;
    task.text = updatedTask.text;
    return task
      .save()
      .then(() => {
        return;
      })
      .catch(error => {
        return error;
      });
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

  getUserByEmail(inputEmail) {
    log.info('Retrieving user info for email: ', inputEmail);
    return UserModel.findOne({ email: inputEmail })
      .then(result => {
        log.info('Successfully retrieved user info for email', inputEmail);
        log.debug('Result:', result);
        return result;
      })
      .catch(error => {
        log.error('An error occurred while retrieving user.', error);
        throw new Error(error);
      });
  }

  saveUser(signUpUser) {
    log.debug('Creating user', signUpUser);
    let user = this.createUser(signUpUser); //TODO log info here
    log.info('Saving user info for ', user.email);
    return user
      .save()
      .then(result => {
        log.info('User was saved! ', result._id);
        return result._id;
      })
      .catch(error => {
        log.error('Error occurred while saving a user: ', error);
        if (error.code == '11000') {
          if (error.errmsg.includes(signUpUser.email)) {
            throw new Error(
              'User with email: ' + user.email + ' already exists.'
            );
          } else if (error.errmsg.includes(signUpUser.handle)) {
            throw new Error(
              'User with handle: ' + user.handle + ' already exists.'
            );
          }
        }

        throw new Error(
          'An error occurred while registering user ',
          signUpUser.email,
          ' to the database, see logs for details.'
        );
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

  createUser(newUser) {
    let createdUser = new UserModel();
    createdUser.firstName = newUser.firstName;
    createdUser.lastName = newUser.lastName;
    createdUser.handle = newUser.handle;
    createdUser.email = newUser.email;
    createdUser.password = newUser.password;
    createdUser.salt = newUser.salt;

    return createdUser;
  }
}
export default new DoerRepository();
