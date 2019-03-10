import mongoose from 'mongoose';
('use strict');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  handle: String,
  email: String,
  password: String,
});

var UserModel;
export class LoginDatabase {
  constructor() {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
    });
    mongoose.Promise = global.Promise; //Why set this up?
    UserModel = mongoose.model('User', UserSchema);
  }

  getByEmailAndPassword() {
    return Promise.resolve('Made it to the database');
  }

  saveUser(signUpUser) {
    let user = new UserModel();
    user.firstName = signUpUser.firstName;
    user.lastName = signUpUser.lastName;
    user.handle = signUpUser.handle;
    user.email = signUpUser.email;
    user.password = signUpUser.password;

    return user.save(function(err) {
      if (err) return 'Something whoopsied while saving kiddo';
    });
  }
}
//TODO write some tests for this saving business
//TODO better handle saving to the database (ie get your promises in order and shit)
export default new LoginDatabase();
