import OktaJwtVerifier from '@okta/jwt-verifier';
import logger from 'pino';

var log = logger();
const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.SPA_CLIENT_ID,
  issuer: process.env.ISSUER,
  assertClaims: {
    aud: 'api://default',
    cid: process.env.SPA_CLIENT_ID,
  },
  testing: {
    disableHttpsCheck: process.env.OKTA_TESTING_DISABLEHTTPSCHECK,
  },
});

export function authenticationRequired(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const match = authHeader.match(/Bearer (.+)/);
  log.info('CHECKING AUTH', authHeader);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(error => {
      log.error('Error occures while verifying access token', error);
      return res.status(401).end();
    });
}
