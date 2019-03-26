import LoginDatabase from './login.db.service';
import bcrypt from 'bcryptjs';
import logger from 'pino';
import jsonwebtoken from 'jsonwebtoken';
('use strict');

var log = logger();
var secretKey = 'cfc6d215-723c-431d-a254-64bcaa48b320'; //TODO move this to it's own config
class LoginService {
  login(email, password) {
    log.info('EMAIL: ', email);
    return LoginDatabase.getUserByEmail(email)
      .then(result => {
        log.info('Result from getUserByEmail: ', result);
        let hashedPass = this.hashPassword(password);
        log.info(hashedPass);
        if (this.comparePassword(hashedPass, result) === true) {
          let claims = {
            iss: 'dublins-node-ws',
            user: email,
          };
          return jsonwebtoken.sign(claims, secretKey);
        }
        // sign with RSA SHA256
        // var privateKey = fs.readFileSync('private.key');
        //var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
        //TODO need to gen a token of some sort for this bit I wager
      })
      .catch(error => {
        log.error('I am about to throw;');
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
      signupUser.password = this.hashPassword(signupUser.password);
      return LoginDatabase.saveUser(signupUser)
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

  hashPassword(password) {
    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  comparePassword(newPassword, userPassword) {
    return bcrypt.compare(newPassword, userPassword);
  }
}

export default new LoginService();
