import LoginService from './login.service';

export class LoginController {
  signup(req, res) {
    if (req.body == null || Object.keys(req.body).length === 0)
      return res.status(400).json({
        message: 'Body was empty.',
      });

    LoginService.signup(req.body)
      .then(success => {
        res
          .status(200)
          .json(success)
          .end();
      })
      .catch(error => {
        res
          .status(422)
          .json({
            message: error,
          })
          .end();
      });
  }
}

export default new LoginController();
