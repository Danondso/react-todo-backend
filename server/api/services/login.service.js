import LoginDatabase from './login.db.service';
import bcrypt from 'bcryptjs';
import logger from 'pino';
('use strict');

var log = logger();

class LoginService {
  login() {
    return LoginDatabase.getByEmailAndPassword();
  }

  signup(signupUser) {
    let userCreatedResult = {
      result: false,
      message: '',
    };
    if (
      this.validateEmail(signupUser.email) &&
      this.validateSignupPayload(signupUser)
    ) {
      signupUser.password = this.hashPassword(signupUser.password);
      let isUserCreated = LoginDatabase.saveUser(signupUser);
      if (isUserCreated === true) {
        userCreatedResult.result = true;
        userCreatedResult.message = 'User created successfully';
      } else {
        userCreatedResult.message = 'Unable to create user.';
      }
    } else {
      userCreatedResult.message = 'Validation failed for user signup payload';
    }
    return Promise.resolve(userCreatedResult);
  }

  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateSignupPayload(signupUser) {
    if (signupUser.firstName === '') return false;
    else if (signupUser.lastName === '') return false;
    else if (signupUser.handle === '') return false;
    else if (signupUser.email === '') return false;
    else if (signupUser.password === '') return false;
    else return true;
  }

  hashPassword(password) {
    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}

export default new LoginService();
