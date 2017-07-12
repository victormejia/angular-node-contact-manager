const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

require('dotenv').config();

let database;

app.use(bodyParser.json());

app.get('/api/contacts', (req, res) => {

  const contactsCollection = database.collection('contacts');

  contactsCollection.find({}).toArray((err, docs) => {
    return res.json(docs)
  });

});

app.post('/api/contacts', (req, res) => {
  const user = req.body;

  const contactsCollection = database.collection('contacts');

  contactsCollection.insertOne(user, (err, r) => {
    if (err) {
      return res.status(500).json({ error: 'Error inserting new record.' })
    }

    const newRecord = r.ops[0];

    return res.status(201).json(newRecord);
  });
});

MongoClient.connect(process.env.DB_CONN, (err, db) => {

  console.log('connected to mongodb...');

  app.listen(3000, () => {
    database = db;
    console.log('listening on port 3000...');
  });

});
