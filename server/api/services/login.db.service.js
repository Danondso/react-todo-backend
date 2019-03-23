import mongoose from 'mongoose';
import logger from 'pino';
('use strict');
const url = process.env.MONGO_URL;
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
    mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    mongoose.Promise = global.Promise; //Why set this up?
    UserModel = mongoose.model('User', UserSchema);
  }

  getByEmail(inputEmail) {
    log.info('LOOKING FOR ', inputEmail);
    return UserModel.findOne({ email: inputEmail }, function(err) {
      if (err) throw err;
    });
  }

  saveUser(signUpUser) {
    log.debug('Creating user', signUpUser);
    let user = this.createUser(signUpUser); //TODO log info here
    log.info('Saving user info for ', user.email);
    return user.save(function(error) {
      if (error) {
        log.error('Error occurred while saving user: ', error);
        return false;
      } else {
        return true;
      }
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
//TODO write some tests for this saving business
//TODO better handle saving to the database (ie get your promises in order and shit)
export default new LoginDatabase();
