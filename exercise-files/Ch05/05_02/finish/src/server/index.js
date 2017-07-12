const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const createExpressApp = require('./create-express-app');

require('dotenv').config();

MongoClient.connect(process.env.DB_CONN, (err, db) => {

  console.log('connected to mongodb...');

  createExpressApp(db)
    .listen(3000, () => {
      database = db;
      console.log('listening on port 3000...');
    });

});
