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

    User.hasMany(Order, { onDelete: 'CASCADE' });
    Order.belongsTo(User); // DIDN'T BOUND?

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
        //  NOT WORKING !!!
      //   orders: [{
      //     id:1,
      //     productId: 123,
      //     delivery: false,
      //     requestDate: new Date()
      //   }]
      }, 
      // {include: Order}
      ).then(()=>User.findAll().then(users => console.dir(users)).catch(error => console.log(error)));
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