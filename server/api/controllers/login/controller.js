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
    if (req.body == null || Object.keys(req.body).length === 0)
      return res.status(400).json({
        message: 'Body was empty.',
      });

    LoginService.signup(req.body).then(r => {
      if (r.result === true)
        res
          .status(201)
          .json({
            message: r.message,
          })
          .end();
      else
        res
          .status(422)
          .json({
            message: r.message,
          })
          .end();
    });
  }
}

export default new Controller();
