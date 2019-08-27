import mongoose from 'mongoose';
import logger from 'pino';
('use strict');
var log = logger();

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  handle: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  salt: {
    type: String,
    required: true,
    trim: true,
  },
});

const TaskSchema = new mongoose.Schema({
  project: {
    type: String,
    required: false,
    trim: true,
  },
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdTime: {
    type: Date,
    required: true,
    trim: true,
  },
});

var UserModel;
var TaskModel;
export class LoginDatabase {
  constructor() {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    mongoose.Promise = global.Promise; //Why set this up?
    UserModel = mongoose.model('User', UserSchema);
    TaskModel = mongoose.model('Task', TaskSchema);
  }

  insertTask(newTask) {
    log.info('Inserting task');
    let task = this.createTask(newTask);
    return task
      .save()
      .then(result => {
        log.info('Task inserted');
        return result._id;
      })
      .catch(error => {
        throw new Error('Unable to save task ', error);
      });
  }

  getUserByEmail(inputEmail) {
    log.info('Retrieving user info for email: ', inputEmail);
    return UserModel.findOne({ email: inputEmail })
      .then(result => {
        log.debug('Got a result back...', result);
        return result;
      })
      .catch(error => {
        log.error('An error occurred while retrieving user.');
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
    createdTask.id = newTask.id;
    createdTask.email = newTask.email;
    createdTask.text = newTask.text;
    createdTask.createdTime = new Date();
    return newTask;
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
export default new LoginDatabase();
