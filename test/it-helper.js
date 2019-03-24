import MongoMemoryServer from 'mongodb-memory-server';
import logger from 'pino';
var log = logger();

var mongoServer = new MongoMemoryServer();
mongoServer.getConnectionString().then(mongoUri => {
  log.info(
    'Setting up in memory mongodb server for integration tests. Connection String: ',
    mongoUri
  );
  process.env.MONGO_URL = mongoUri;
});
