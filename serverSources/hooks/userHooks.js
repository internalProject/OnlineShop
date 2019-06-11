const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const safeStringify = require('json-stringify-safe');
var lodash = require('lodash');

module.exports = function (app, jsonParser, models) {
    app.post('/sign-up', jsonParser, (req, res) => {
        models.User.findAll({
          where: {
            [Op.or]: [{name: req.body.name}, {email: req.body.email}]
          }
        })
        .then( findedUsers => {
          if (findedUsers.length === 0) {
            models.User.create({...req.body, roleId: 2, disabled: false, }).then(data=> {
              res.send({
                message: `user ${req.body.name} was created`,
                status: 'success',
                name: req.body.name,
              });
            })
            .catch(e => console.log('server error => ',e));
          } else {
            res.send({
              message: 'Such name or email are already in use.',
              status: 'fail',
            });
          }
      
        });
        
      });
      
      app.post('/sign-in', jsonParser, (req, res) => {
        models.User.findOne({where: {email: req.body.email}})
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
                disabled: user.disabled,
                roleId: user.roleId,
              }, isUserExists: true,}));
            }
            if (user.password !== req.body.password && user.email === req.body.email) {
              res.json(safeStringify({
                wrongPassword: true,
              }));
            }
          }
        })
        .catch(e => {
          res.send({isUserExists: false});
        });
      });
      
      app.post('/user-data', jsonParser, (req, res) => {
        models.User.findOne({where: {name: req.body.name}})
        .then(findedUser => {
          res.json(safeStringify({user: {...findedUser}}))
        })
        .catch(searchResult => console.dir(searchResult));
      });
      
      app.post('/make-order', jsonParser, (req, res) => {
        
        models.Order.create({
          userId: req.body.user.id,
          date: req.body.order.date,
        })
        .then(result => {
          let orderDetails = req.body.order.items.map( item => {
            return models.OrderDetail.create({
              orderId: result.id,
              productId: item.id,
              quantity: item.quantity,
            })
          });
          Promise.all(orderDetails)
          .then(processedOrder => {
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
        models.Order.findAll({where: {userId: req.body.id,}})
        .then(orders => {
      
          let restoredOrders = orders.map(
            order => {
            // ---------------- order restoring ----------------
            let productsForAdding = models.OrderDetail.findAll( {where: { orderId: order.id }} )
              .then(product_idNq_pair => {
                let products = Promise.all( product_idNq_pair.map( p => models.Product.findOne( {where: {id: p.productId}} ).then(prod => Promise.resolve({quantity: p.quantity, product: prod})) ) ) //p это объект id+q который нужно превратить в q+prod
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
        models.User.update({
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
          role: req.body.role,
          disabled: req.body.disabled,
        }, {returning: true, where: {id: req.body.id}},)
        .then( user => {
          res.json(safeStringify(user));
        } )
        .catch(fail => res.json(fail));
      });
}