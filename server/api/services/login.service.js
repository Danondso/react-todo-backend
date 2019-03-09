import LoginDatabase from './login.db.service';
('use strict');

class LoginService {
  login() {
    return LoginDatabase.getByEmailAndPassword();
  }

  signup(signup) {
    //TODO setup some sanitation here.

    let user = {
      firstName: signup.firstName,
      lastName: signup.lastName,
      handle: signup.handle,
      email: signup.email,
      password: signup.password, //TODO need to salt/hash the thing
    };
    LoginDatabase.signupUser(user);
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

export default new LoginService();
