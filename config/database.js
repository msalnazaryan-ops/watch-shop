const { Sequelize } = require('sequelize');
const path = require('path');
const sqlite3 = require('sqlite3'); // Այս պակետը կարող է պահանջվել որպես driver

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    dialectModule: sqlite3, // Հստակ նշում ենք driver-ը
    logging: false
});

module.exports = sequelize;