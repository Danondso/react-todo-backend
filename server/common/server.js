import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import taskRouter from '../api/tasks/task.router';
import cors from 'cors';

const swaggerDocument = YAML.load('server/common/swagger/Api.yaml');
const app = new Express();

var corsOptions = {
  origin: '*',
  methods: 'POST, GET, PUT, DELETE',
  allowedHeaders: 'Authorization, Content-Type',
  credentials: true,
};

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
    app.use(cors(corsOptions));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api/v1/', taskRouter);
  }

  listen(port = process.env.PORT) {
    const welcome = p => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`
      );
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
