const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

let database;

MongoClient.connect(process.env.DB_CONN, (err, db) => {

  console.log('connected to mongodb...');

  app.listen(3000, () => {
    database = db;
    console.log('listening on port 3000..');
  });

});

app.get('/contacts', (req, res) => {
  const contactsCollection = database.collection('contacts');

  contactsCollection.find({}).toArray((err, docs) => {
    return res.json(docs);
  });
});
