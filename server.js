var cors = require('cors');
var express = require('express');
var app = express();
const Sequelize = require('sequelize');
const model = require('./model.js');
const path = require('path');

const port = process.env.PORT || 3000;


const sequelize = new Sequelize('postgres', 'postgres', 'take5five', {
st: 'localhost',
  port: '5432',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // #region create db
    const Model = Sequelize.Model;
    class User extends Model {}
    User.init(model.user(Sequelize), {
      sequelize,
      modelName: 'user'
    });

    class Order extends Model {}
    Order.init(model.order(Sequelize), {
      sequelize,
      modelName: 'order'
    })

    class Product extends Model {}
    Product.init(model.product(Sequelize), {
      sequelize, modelName: 'product'
    })

    Product.belongsToMany(User, {through: Order, as: 'orders', foreignKey: 'productId', otherKey: 'userId'});
    User.belongsToMany(Product, {through: Order, as: 'orders', foreignKey: 'userId', otherKey: 'productId'});
    

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(cors());

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});


app.listen(port);