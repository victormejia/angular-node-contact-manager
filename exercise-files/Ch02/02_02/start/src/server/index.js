const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

let database;

app.get('/api/contacts', (req, res) => {

  const contactsCollection = database.collection('contacts');

  contactsCollection.find({}).toArray((err, docs) => {
    return res.json(docs)
  });

});


MongoClient.connect(process.env.DB_CONN, (err, db) => {

  console.log('connected to mongodb...');

  app.listen(3000, () => {
    database = db;
    console.log('listening on port 3000...');
  });

});
