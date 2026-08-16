const { Sequelize } = require('sequelize');
require('dotenv').config();

// Եթե կա DATABASE_URL (Render-ում), օգտագործում է այն, թե չէ՝ տեղային կարգավորումները
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            logging: false
        }
    );

module.exports = sequelize;