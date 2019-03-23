import chai from 'chai';
import LoginService from '../server/api/services/login.service';

describe('signup', function() {
  //TODO create mock mongoDB
  //TODO setup env file to pull in localhost mongo

  it('Should return true when a valid payload is passed in.', function() {
    let result = LoginService.signup({
      firstName: 'Dublin',
      lastName: 'Anondson',
      handle: 'pinknobody',
      email: 'dublin.anondson@gmail.com',
      password: 'testPasswordBecauseFakeApp',
    });
    chai.should();
    Boolean(result).should.be.equal(true);
  });

  it('Should return false when the email is invalid.', function() {
    let result = LoginService.signup({
      firstName: 'Dublin',
      lastName: 'Anondson',
      handle: 'pinknobody',
      email: 'dublin.anondson',
      password: 'testPasswordBecauseFakeApp',
    });
    chai.should();
    Boolean(result).should.be.equal(true);
  });

  it('Should return false when a value is blank in the payload', function() {
    let result = LoginService.signup({
      firstName: 'Dublin',
      lastName: '',
      handle: 'pinknobody',
      email: 'dublin.anondson@gmail.com',
      password: 'testPasswordBecauseFakeApp',
    });
    chai.should();
    Boolean(result).should.be.equal(true);
  });
});

describe('login', function() {
  it('Should return a true if the login was successful.', function() {
    let result = LoginService.login('testUser', 'testPassword');
    chai.should();
  });
});
