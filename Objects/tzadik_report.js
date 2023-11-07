const Sequelize = require('sequelize');
const sequelize = new Sequelize("tzadik", "postgres", "okokokok", {
    host: 'localhost',
    port: '5433',
    dialect: 'postgres'
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
    report_timestamp: {
        type: Sequelize.DATE,
        allowNull: false
    }
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
