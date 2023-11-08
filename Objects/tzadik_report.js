const Sequelize = require('sequelize');
// const sequelize = new Sequelize("tzadik", "postgres", "okokokok", {
//     host: 'localhost',
//     port: '5433',
//     dialect: 'postgres'
// });

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
        rejectUnauthorized: false // Use only in development environment
      }
    }
  });

class TzadikReport extends Sequelize.Model {}
TzadikReport.init({
    tzadik_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reporter_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // report_timestamp: {
    //     type: Sequelize.DATE,
    //     allowNull: false
    // }
}, {
    sequelize,
    modelName: 'tzadik_report'
});

sequelize.sync()
    .then(() => {
        console.log('Tzadik Reports table created successfully');
    })
    .catch(err => {
        console.error('Error creating tzadik_reports table:', err);
    });

module.exports = TzadikReport;
