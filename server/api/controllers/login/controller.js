import LoginService from '../../services/login.service';

export class Controller {
  login(req, res) {
    LoginService.login('testuser@gmail.com').then(r => {
      res
        .status(200)
        .json(r)
        .end();
    });
  }

  signup(req, res) {
    LoginService.signup(req.body).then(r => {
      res
        .status(200)
        .json(r)
        .end();
    });
  }
}

export default new Controller();
