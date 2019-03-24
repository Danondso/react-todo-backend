import LoginService from '../../services/login.service';

export class LoginController {
  login(req, res) {
    LoginService.login(req.header('userId'), req.header('password')).then(r => {
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

    LoginService.signup(req.body)
      .then(r => {
        if (r === true) res.status(201).end(); //TODO this logic is broken af in here, learn to understand promises. 
        else
          res
            .status(422)
            .json({
              message: r,
            })
            .end();
      })
      .catch(error => {
        res
          .status(500)
          .json({
            message: error,
          })
          .end();
      });
  }
}

export default new LoginController();
