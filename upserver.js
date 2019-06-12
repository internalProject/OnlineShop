var cors = require('cors');
var fs = require('fs');
var fspromices = require("promise-fs");
var express = require('express');
var app = express();
var establishedModels = require('./serverSources/modelsSetups.js').models;
const Sequelize = require('sequelize');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const sequelize = require('./serverSources/dbConnection.js').sequelize;
const Op = Sequelize.Op;
const safeStringify = require('json-stringify-safe');
var lodash = require('lodash');

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

sequelize.sync();
const jsonParser = bodyParser.json();
const  urlencodedParser = bodyParser.urlencoded({ extended: false });
require('./serverSources/hooks/adminHooks.js')(app, jsonParser, establishedModels);
require('./serverSources/hooks/userHooks.js')(app, jsonParser, establishedModels);

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(cors());

// --------------------------------------------------------------------------

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});


app.listen(port);
