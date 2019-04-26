var cors = require('cors');
var express = require('express');
var app = express();
const Sequelize = require('sequelize');
const model = require('./model.js');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const safeStringify = require('json-stringify-safe');


const sequelize = new Sequelize('postgres', 'postgres', 'take5five', {
st: 'localhost',
  port: '5432',
  dialect: 'postgres'
});

// #region sequelize
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const Model = Sequelize.Model;
class User extends Model {}
User.init(model.user(Sequelize), {
  sequelize,
  modelName: 'user', timestamps: false,
});


class Order extends Model {}
Order.init(model.order(Sequelize), {
  sequelize,
  modelName: 'order', timestamps: false,
})

class Product extends Model {}
Product.init(model.product(Sequelize), {
  sequelize, modelName: 'product', timestamps: false,
})

Product.belongsToMany(User, {through: Order, as: 'orders', foreignKey: 'productId', otherKey: 'userId'});
User.belongsToMany(Product, {through: Order, as: 'orders', foreignKey: 'userId', otherKey: 'productId'});
// #endregion
sequelize.sync();
const jsonParser = bodyParser.json();
const  urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(cors());

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

app.post('/sign-up', jsonParser, (req, res) => {
  User.create(req.body).then(data=> {
    console.log('success');
    res.send(`user ${req.body.name} was created`);
}).catch(e => console.log('server error => ',e));
})

app.post('/sign-in', jsonParser, (req, res) => {
  User.findOne({where: {email: req.body.email}})
  .then(user => {
    res.json(safeStringify({user:{
      name: user.name,
      email: user.email,
    }, isUserExists: true,}));
  })
  .catch(e => {
    console.log('user hasn\'t found!', e);
    res.send({isUserExists: false});
  });
});


app.listen(port);