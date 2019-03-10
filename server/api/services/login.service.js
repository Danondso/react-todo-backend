import LoginDatabase from './login.db.service';
import bcrypt from 'bcryptjs';
('use strict');

class LoginService {
  login() {
    return LoginDatabase.getByEmailAndPassword();
  }

  signup(signup) {
    //TODO setup some sanitation here.
    if (this.validateSignUp(signup)) {
      let user = {
        firstName: signup.firstName,
        lastName: signup.lastName,
        handle: signup.handle,
        email: signup.email,
        password: this.hashPassword(signup.password),
      };
      return Promise.resolve(LoginDatabase.saveUser(user));
    }
    return Promise.resolve('Your payload was empty dummy');
  }

  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateSignUp(signupUser) {
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
