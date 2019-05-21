var cors = require('cors');
var express = require('express');
var app = express();
const Sequelize = require('sequelize');
// const model = require('./model.js');
const userModel = require('./models/user.js').userModel,
orderModel = require('./models/order.js').orderModel,
productModel = require('./models/product.js').productModel;
 
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const safeStringify = require('json-stringify-safe');
const Op = Sequelize.Op;


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
// User.init(model.user(Sequelize), {
User.init(userModel(Sequelize), {
  sequelize,
  modelName: 'user', timestamps: false,
});


class Order extends Model {}
// Order.init(model.order(Sequelize), {
Order.init(orderModel(Sequelize), {
  sequelize,
  modelName: 'order', timestamps: false,
})

class Product extends Model {}
// Product.init(model.product(Sequelize), {
Product.init(productModel(Sequelize), {
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
  User.findAll({
    where: {
      [Op.or]: [{name: req.body.name}, {email: req.body.email}]
    }
  })
  .then( findedUsers => {
    if (findedUsers.length === 0) {
      User.create(req.body).then(data=> {
        console.log('success');
        res.send({
          message: `user ${req.body.name} was created`,
          status: 'success',
          name: req.body.name,
        });
      })
      .catch(e => console.log('server error => ',e));
    } else {
      console.log('try to create user with same email or name');
      res.send({
        message: 'Such name or email are already in use.',
        status: 'fail',
      });
    }

  });
  
})

app.post('/sign-in', jsonParser, (req, res) => {
  User.findOne({where: {email: req.body.email}})
  .then(user => {
    if (user === null) {
      // big issue! check this.
      res.send('Wrong email.');
    }
    else {
      if (user.password === req.body.password && user.email === req.body.email) {
        res.json(safeStringify({user:{
          name: user.name,
          email: user.email,
          password: user.password,
          id: user.id,
        }, isUserExists: true,}));
      }
      if (user.password !== req.body.password && user.email === req.body.email) {
        console.log('wrong password!');
        res.json(safeStringify({
          wrongPassword: true,
        }));
      }
    }
  })
  .catch(e => {
    console.log('user hasn\'t found!', e);
    res.send({isUserExists: false});
  });
});

app.post('/user-data', jsonParser, (req, res) => {
  User.findOne({where: {name: req.body.name}})
  .then(findedUser => {
    res.json(safeStringify({user: {...findedUser}}))
  })
  .catch(searchResult => console.dir(searchResult));
})

app.post('/make-order', jsonParser, (req, res) => {
  let orders = req.body.order.map(o => {
    return Order.create({
      userId: req.body.user.id,
      productId: o.id,
      quantity: o.quantity,
      address: req.body.user.address,
    });
  });

  Promise.all(orders)
  .then(result => {
    console.log('User\'s order successfully accepted!');
    console.dir(new Date().getMilliseconds());
    res.json(safeStringify(result));
  })
  .catch(error => res.json(safeStringify(error)));
})

app.listen(port);