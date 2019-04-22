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

    User.belongsToMany(Product, {through: Order});
    Product.belongsTo(User, {through: Order});

    // #endregion
    User.sync({ force: true })
    .then(() => {
      return User.create({
        id: 1,
        userName: 'first user',
        firstName: 'John',
        lastName: 'Doe',
        email: "noname@mail.com",
        birthDate: new Date(1977, 3, 20),
      }, 
      ).then(()=>User.findAll().then(users => console.dir(users)).catch(error => console.log(error)));
    });

    Product.sync({force: true}).then(() => {
      return Product.create({
        id: 1,
        description: 'some product description',
        image: './client/assets/bullets.jpg',
      })
    })

    Order.sync({force: true}).then(() => {
      return Order.create({
        userId: 1,
        orderId: 1,
      });
    });
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