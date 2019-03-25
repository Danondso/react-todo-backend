import mongoose from 'mongoose';
import logger from 'pino';
('use strict');
var log = logger();

var UserSchema = new mongoose.Schema({
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
});

var UserModel;
export class LoginDatabase {
  constructor() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    mongoose.Promise = global.Promise; //Why set this up?
    UserModel = mongoose.model('User', UserSchema);
  }

  getUserByEmail(inputEmail) {
    log.info('LOOKING FOR ', inputEmail);
    return UserModel.findOne({ email: inputEmail })
      .then(result => {
        log.info('Got a result back...', result);
        return result.password;
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

  createUser(newUser) {
    let createdUser = new UserModel();
    createdUser.firstName = newUser.firstName;
    createdUser.lastName = newUser.lastName;
    createdUser.handle = newUser.handle;
    createdUser.email = newUser.email;
    createdUser.password = newUser.password;

    return createdUser;
  }
}
export default new LoginDatabase();
