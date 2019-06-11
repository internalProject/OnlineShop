var cors = require('cors');
var express = require('express');
var app = express();
var lodash = require('lodash');
var establishedModels = require('./serverSources/modelsSetups.js').models;
const Sequelize = require('sequelize');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const safeStringify = require('json-stringify-safe');
const Op = Sequelize.Op;
const sequelize = require('./serverSources/dbConnection.js').sequelize;

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

// require('./test.js')(app, jsonParser, establishedModels);

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(cors());

// --------------------------------------------------------------------------

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

function dateToPropperFormat(date) {
  return  date.replace('T', '   ').slice(0, date.indexOf('.'));
}

app.listen(port);
