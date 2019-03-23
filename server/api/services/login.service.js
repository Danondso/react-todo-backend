import LoginDatabase from './login.db.service';
import bcrypt from 'bcryptjs';
import logger from 'pino';
('use strict');

var log = logger();

class LoginService {
  login(email, password) {
    log.info('EMAIL: ', email);
    let user = LoginDatabase.getByEmail(email);
    let unhashPassword = this.hashPassword(password);
    log.info(
      'UNHASHED PASSWORD: ',
      unhashPassword,
      'PASSWORD INPUT: ',
      String(user.password)
    );
    if (password === unhashPassword) return Promise.resolve(true);

    return Promise.resolve(false);
  }

  signup(signupUser) {
    if (
      this.validateEmail(signupUser.email) &&
      this.validateSignupPayload(signupUser)
    ) {
      log.info('Valid userSignup payload received, saving user...');
      signupUser.password = this.hashPassword(signupUser.password);
      let isUserCreated = LoginDatabase.saveUser(signupUser);
      return Promise.resolve(isUserCreated);
    }
    throw 'Validation failed for user signup payload';
  }

  validateEmail(email) {
    log.info('Validating user email: ', email);
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

  unhashPassword() {}
}

export default new LoginService();
