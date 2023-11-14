const Sequelize = require('sequelize');
// const credentials = require('./Credentials')

const sequelize = new Sequelize({
  database: 'postgres',
  username: 'postgres',
  password: 'tzdbnig228',
  host: 'tzadik.csidgvwyscy4.us-east-2.rds.amazonaws.com',
  port: '5432',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;
