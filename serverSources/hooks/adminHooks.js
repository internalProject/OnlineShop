const Sequelize = require('sequelize');
const safeStringify = require('json-stringify-safe');
var lodash = require('lodash');
const Op = Sequelize.Op;

module.exports = function (app, jsonParser, models) {
    app.post('/admin', jsonParser, (req, res) => {
      models.User.findOne({where: {id: req.body.userId}})
      .then(user => models.Role.findOne( { where: { id: user.roleId }} ) )
      .then(role => role.role === 'admin' ? res.json( {isAccessAllowed: true, } ) : res.json( {isAccessAllowed: false, } ) )
      .catch( fail => res.json({fail}) );
    });

    app.post('/search-stock-items', jsonParser, (req, res) => {
      if (req.body.searchState.term.length === 0) {
        models.Product.findAll()
        .then( items => res.json(items) )
        .catch( fail => res.json(fail) );
        return;
      }
    
      let allSearchhKeys = req.body.searchState.term.split(' ');
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
    
      if (req.body.searchState.fieldBy === 'names') {
        let promiseSearchList = allSearchhKeys.map(v => {
          if (v.length < 3) return;
      
          return models.Product.findAll( {
            where: {
              name: {
                [Op.substring]: `%${v}%`
              }
            }
          } ); } );
        
        Promise.all(promiseSearchList)
        .then( items => res.json(lodash.uniqBy(lodash.union(...items), 'id')) );
      } else {
        models.Product.findAll({where: {
          id: {
            [Op.in]: idKeys,
          }
        } } )
        .then( items => res.json(items));
      }
    });

    app.post('/delete-product-by-id', jsonParser, (req, res) => {
      models.Product.destroy({where: {
        id: req.body.itemId,
      }})
      .then(numberOfDeletedRows => {
        console.log('numberOfDeletedRows : ', numberOfDeletedRows);
        res.json( {
          status: 'ok',
          message: `Product has deleted successfully! ${dateToPropperFormat(new Date().toISOString())}`,
        } );
      })
      .catch( fail => res.json(fail) );
    });

    app.post('/update-product', jsonParser, (req, res) => {
      models.Product.update(
        {name: req.body.name, description: req.body.description},
        {returning: true, where: { id: req.body.id } 
      })
      .then( product => res.json(product))
      .catch( fail => res.json(fail));
  });

  app.post('/create-new-product', jsonParser, (req, res) => {
    models.Product.create({
      name: req.body.name,
      description: req.body.description,
      image: '',
    })
    .then( addedProduct => res.json({product: addedProduct, status: 'created'}) )
    .catch( fail => res.json(fail) );
  });

  app.get('/get-all-users', jsonParser, (req, res) => {
    models.User.findAll()
    .then( users => {
      res.json({users}); 
    })
    .catch( fail => res.json(fail) )
  })

  app.post('/switch-user-status', jsonParser, (req, res) => {
    models.User.findOne({where: {
      id: req.body.userId
    }})
    .then( user => {
      return models.User.update({
      disabled: !user.disabled,
    }, {returning: true, where: {id: user.id}}); 
    })
    .then( updatedUser => {
      res.json({
        updatedUser: updatedUser[1][0],
        success: true,
      }); 
    })
    .catch( fail => res.json(fail) )
  });

  app.post('/all-user-orders', jsonParser, (req, res) => {
    models.Order.findAll({where: {userId: req.body.userId,}})
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
      Promise.all(restoredOrders).then( responseForUser => res.json({orders: responseForUser, status: 'ok', }) );
    })
  })
}

function dateToPropperFormat(date) {
  return  date.replace('T', '   ').slice(0, date.indexOf('.'));
}