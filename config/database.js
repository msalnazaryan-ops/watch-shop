const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite-ի դեպքում բազան կպահպանվի պրոեկտի ներսում գտնվող database.sqlite ֆայլում
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false
});

module.exports = sequelize;