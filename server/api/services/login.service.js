import LoginDatabase from './login.db.service';
import bcrypt from 'bcryptjs';
import logger from 'pino';
('use strict');

var log = logger();

class LoginService {
  login(email, password) {
    log.info('EMAIL: ', email);
    let unhashPassword = this.hashPassword(password);
    if (password === unhashPassword) return Promise.resolve(true);
    return Promise.resolve(false);
  }

  signup(signupUser) {
    let result = this.validateSignupPayload(signupUser);
    if (result === true) {
      log.info(
        'Valid signup payload received, saving user...',
        signupUser.email
      );
      signupUser.password = this.hashPassword(signupUser.password);
      return Promise.resolve(LoginDatabase.saveUser(signupUser));
    }
    return Promise.resolve(result);
  }

  validateSignupPayload(signupUser) {
    if (signupUser.firstName === '')
      return new Error('firstName is a required field.');
    else if (signupUser.lastName === '')
      return new Error('lastName is a required field.');
    else if (signupUser.handle === '')
      return new Error('handle is a required field.');
    else if (!this.isValidEmail(signupUser.email) || signupUser.email === '')
      return new Error('email is invalid.');
    else if (signupUser.password === '')
      return new Error('password is a required field.');
    else return true;
  }

  isValidEmail(email) {
    log.info('Validating user email: ', email);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  hashPassword(password) {
    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  unhashPassword() {}
}

export default new LoginService();
