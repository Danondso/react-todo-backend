import MongoMemoryServer from 'mongodb-memory-server';

let temp = new MongoMemoryServer();
process.env.MONGO_URL = temp.getConnectionString();
