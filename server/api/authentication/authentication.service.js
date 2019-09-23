import OktaJwtVerifier from '@okta/jwt-verifier';
import logger from 'pino';

var log = logger();
const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.SPA_CLIENT_ID,
  issuer: process.env.ISSUER,
  assertClaims: {
    aud: process.env.AUDIENCE,
    cid: process.env.SPA_CLIENT_ID,
  },
  testing: {
    disableHttpsCheck: process.env.OKTA_TESTING_DISABLEHTTPSCHECK,
  },
});

export function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  log.debug('Checking authentication for token:', authHeader);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken, process.env.AUDIENCE)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(error => {
      log.error('Error occurred while verifying access token:', error.message);
      return res.status(401).end();
    });
}
