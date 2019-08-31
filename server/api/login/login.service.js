import DoerRepository from '../services/db.service';
import bcrypt from 'bcryptjs';
import logger from 'pino';
import jsonwebtoken from 'jsonwebtoken';
('use strict');

var log = logger();
var secretKey = 'cfc6d215-723c-431d-a254-64bcaa48b320'; //TODO move this to it's own config
class LoginService {
  login(email, password) {
    log.info('EMAIL: ', email);
    return DoerRepository.getUserByEmail(email)
      .then(result => {
        log.debug('Result from getUserByEmail: ', result);
        let hashedPass = bcrypt.hashSync(password, result.salt);
        if (this.comparePassword(hashedPass, result.password)) {
          log.info('Generating jwt token for ', email);
          let claims = {
            iss: 'dublins-node-ws',
            firstName: result.firstName,
            lastName: result.lastName,
            handle: result.handle,
            email: email,
          };
          return jsonwebtoken.sign(claims, secretKey); //'RS256 algorithm doesn't appear to work for some reason...
        } else {
          return 'Password was invalid for user: ', email;
        }
      })
      .catch(error => {
        throw error;
      });
  }

  signup(signupUser) {
    let result = this.validateSignupPayload(signupUser);
    if (result === true) {
      log.info(
        'Valid signup payload received, saving user...',
        signupUser.email
      );
      let salt = bcrypt.genSaltSync(12);
      let hashedPassword = bcrypt.hashSync(signupUser.password, salt);
      signupUser.salt = salt;
      signupUser.password = hashedPassword;
      return DoerRepository.saveUser(signupUser)
        .then(result => {
          log.info('User saved successfully, mongo ID: ', result);
          return 'User saved successfully';
        })
        .catch(error => {
          log.error('ERROR FROM THE DATABASE:', error.message);
          throw error.message;
        });
    }

    return Promise.reject(result.message);
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

  comparePassword(newPassword, userPassword) {
    return bcrypt.compare(newPassword, userPassword);
  }
}

export default new LoginService();
