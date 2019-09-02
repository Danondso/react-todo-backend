import LoginService from './login.service';

export class LoginController {
  login(req, res) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    LoginService.login(username, password)
      .then(r => {
        res
          .status(200)
          .header('user-token', r)
          .end();
      })
      .catch(error => {
        res
          .status(403)
          .json({
            message: error,
          })
          .end();
      });
  }

  signup(req, res) {
    if (req.body == null || Object.keys(req.body).length === 0)
      return res.status(400).json({
        message: 'Body was empty.',
      });

    LoginService.signup(req.body)
      .then(success => {
        res
          .status(201)
          .json({
            message: success,
          })
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
