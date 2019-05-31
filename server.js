var cors = require('cors');
var express = require('express');
var app = express();
const Sequelize = require('sequelize');
const userModel = require('./alter models/user.js').userModel,
orderModel = require('./alter models/order.js').orderModel,
orderDetailModel = require('./alter models/orderDetail.js').orderDetailModel,
productModel = require('./alter models/product.js').productModel,
roleModel = require('./alter models/role.js').roleModel;

 
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

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});



const Model = Sequelize.Model;

class Role extends Model {}
Role.init(roleModel(Sequelize), {
  sequelize, modelName: 'role', timestamps: false,
});

class User extends Model {}
User.init(userModel(Sequelize), {
  sequelize,
  modelName: 'user', timestamps: false,
});


class Order extends Model {}
Order.init(orderModel(Sequelize), {
  sequelize,
  modelName: 'order', timestamps: false,
})

class OrderDetail extends Model {}
OrderDetail.init(orderDetailModel(Sequelize), {
  sequelize,
  modelName: 'orderDetail', timestamps: false,
})

class Product extends Model {}
Product.init(productModel(Sequelize), {
  sequelize, modelName: 'product', timestamps: false,
})

Role.hasMany(User, {foreignKey: 'roleId'});
User.hasMany(Order, {foreignKey: 'userId'});
Order.belongsToMany(Product, {through: OrderDetail, as: 'orderDetails', foreignKey: 'orderId', otherKey: 'productId'});
Product.belongsToMany(Order, {through: OrderDetail, as: 'orderDetails', foreignKey: 'productId', otherKey: 'orderId'});

sequelize.sync();
const jsonParser = bodyParser.json();
const  urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(cors());

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

app.post('/sign-up', jsonParser, (req, res) => {
  console.log('check address'),
  console.dir(req.body.address);
  User.findAll({
    where: {
      [Op.or]: [{name: req.body.name}, {email: req.body.email}]
    }
  })
  .then( findedUsers => {
    if (findedUsers.length === 0) {
      User.create({...req.body, roleId: 2}).then(data=> {
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
  
});

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
          address: user.address,
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
});

app.post('/make-order', jsonParser, (req, res) => {
  
  Order.create({
    userId: req.body.user.id,
    date: req.body.order.date,
  })
  .then(result => {
    let orderDetails = req.body.order.items.map( item => {
      return OrderDetail.create({
        orderId: result.id,
        productId: item.id,
        quantity: item.quantity,
      })
    });
    Promise.all(orderDetails)
    .then(processedOrder => {
      console.log('order processed SUCCESSFULLY!');
      res.json(safeStringify({
        processedOrder: req.body,
        hasOrderSavedToDb: true,
      }));
    })
    .catch(fail => res.json(safeStringify({fail, hasOrderSavedToDb: false,})));
  })
  .catch(fail => res.json(safeStringify({fail, hasOrderSavedToDb: false,})));
});

app.post('/my-orders', jsonParser, (req, res) => {
  console.log(`req body id: ${req.body.id}, body: ${req.body}`);

  Order.findAll({where: {userId: req.body.id,}})
  .then(orders => {

    let restoredOrders = orders.map(
      order => {
      // ---------------- order restoring ----------------
      let productsForAdding = OrderDetail.findAll( {where: { orderId: order.id }} )
        .then(product_idNq_pair => {
          let products = Promise.all( product_idNq_pair.map( p => Product.findOne( {where: {id: p.productId}} ).then(prod => Promise.resolve({quantity: p.quantity, product: prod})) ) ) //p это объект id+q который нужно превратить в q+prod
          .then(extra => extra);
          return products;
        })
          .then(final => final)
    let assembledOrder = productsForAdding.then( restoredProducts => Promise.resolve({id: order.id, date: order.date, products: restoredProducts}) );
    return assembledOrder;
      // ---------------- ---------------- ----------------
    }
    )
    Promise.all(restoredOrders).then( responseForUser => res.json(responseForUser) );
  })
  .catch(fail => console.log('______ FAIL ON USER ORDERS', fail));
});

app.post('/update-user', jsonParser, (req, res) => {
  User.update({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  }, {returning: true, where: {id: req.body.id}},)
  .then( user => {
    res.json(safeStringify(user));
  } )
  .catch(fail => res.json(fail));
});

app.post('/admin', jsonParser, (req, res) => {
  User.findOne({where: {id: req.body.userId}})
  .then(user => Role.findOne( { where: { id: user.roleId }} ) )
  .then(role => role.role === 'admin' ? res.json( {isAccessAllowed: true, } ) : res.json( {isAccessAllowed: false, } ) )
  .catch( fail => res.json({fail}) );
});

app.post('/search-stock-items', jsonParser, (req, res) => {
  let allSearchhKeys = req.body.query.split(' ');
  let idKeys = allSearchhKeys.filter(key => {
    // check for not chars+integers
    if (
      ( /^[0-9]*$/.test(key) ) &&
      ( !isNaN(parseFloat(key)) && isFinite(key) )
    ) return true;
    return false;
  })

  for (let index = 0; index < idKeys.length; index++) {
    let removablePlace = allSearchhKeys.indexOf(idKeys[index]);
    if (removablePlace !== -1) {

      allSearchhKeys.splice(removablePlace, 1);
    }
    // at the end of cycle allSearchKeys has name-keys, without id-keys
  }

  idKeys = idKeys.map(k => parseFloat(k, 10) );

  Product.findAll({where: {
    [Op.or]: { // NOTE IT! necessary for multiple search
      id: { [Op.in]: idKeys}, // search based on array of values - idKeys
      name: {[Op.in]: allSearchhKeys} // search based on array of values - allSearchKeys
    } 
  },
  raw: true, // this remove duplicates
})
  .then( items => res.json(items) )
  .catch( fail => res.json(fail) )
});

app.post('/delete-product-by-id', jsonParser, (req, res) => {
  Product.destroy({where: {
    id: req.body.itemId,
  }})
  .then(numberDeletedRows => {
    console.log('numberDeletedRows ', numberDeletedRows);
    numberDeletedRows === 1 ?
      res.json({
        status: 'ok',
        message: `Product has deleted successfully! ${dateToPropperFormat(new Date())}`,
      }) : null
    }
  )
  .catch( fail => res.json({fail}) );
});

function dateToPropperFormat(date) {
  return  date.replace('T', '   ').slice(0, date.indexOf('.'));
}

app.listen(port);
