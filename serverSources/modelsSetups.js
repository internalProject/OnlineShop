const Sequelize = require('sequelize');
const userModel = require('./alter models/user.js').userModel,
orderModel = require('./alter models/order.js').orderModel,
orderDetailModel = require('./alter models/orderDetail.js').orderDetailModel,
productModel = require('./alter models/product.js').productModel,
roleModel = require('./alter models/role.js').roleModel,
imageModel = require('./alter models/image.js').imageModel;
const sequelize = require('./dbConnection.js').sequelize;
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

class Image extends Model {}
Image.init(imageModel(Sequelize), {
  sequelize, modelName: 'image', timestamps: false,
})

Role.hasMany(User, {foreignKey: 'roleId'});
User.hasMany(Order, {foreignKey: 'userId'});
Order.belongsToMany(Product, {through: OrderDetail, as: 'orderDetails', foreignKey: 'orderId', otherKey: 'productId'});
Product.belongsToMany(Order, {through: OrderDetail, as: 'orderDetails', foreignKey: 'productId', otherKey: 'orderId'});

module.exports.models = {Role, User, Order, OrderDetail, Product, Image};