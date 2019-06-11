const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'take5five', {
st: 'localhost',
    port: '5432',
    dialect: 'postgres'
});

module.exports.sequelize = sequelize;