require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const users = require('./users');
const contacts = require('./contacts');


function seedCollection(collectionName, initialRecords) {

  MongoClient.connect(process.env.DB_CONN, (err, db) => {
    console.log('connected to mongodb...');

    const collection = db.collection(collectionName);

    collection.remove();  

    initialRecords.forEach((item) => {
      if (item.password) {
        item.password = bcrypt.hashSync(item.password, 10);
      }
    });

    console.log('inserting records...');

    collection.insertMany(initialRecords, (err, result) => {
      console.log(`${result.insertedCount} records inserted.`);
      console.log('closing connection...');
      db.close();
      console.log('done.');
    });

  });
}


seedCollection('users', users);
seedCollection('contacts', contacts);
