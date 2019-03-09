import MongoClient from 'mongodb';
('use strict');
var mongodb;
export class LoginDatabase {
  constructor() {
    let url = 'mongodb://'; //TODO move this to the config file once the setup is confirmed.
    mongodb = MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      console.log('Database created!');
      db.close();
    });
  }

  getByEmailAndPassword() {
    return Promise.resolve('Made it to the database');
  }

  signupUser() {
    Promise.resolve(mongodb.users.insert());
  }
}

export default new LoginDatabase();
