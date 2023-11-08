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

class TzadikIdentity extends Sequelize.Model {}
TzadikIdentity.init({
    tzadik_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    assignment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // identity_creation_timestamp: {
    //     type: Sequelize.STRING
    //     // ,allowNull: false
    // }
}, {
    sequelize,
    modelName: 'tzadik_identity'
});

sequelize.sync()
    .then(() => {
        console.log('Tzadik Identities table created successfully');
    })
    .catch(err => {
        console.error('Error creating tzadik_identities table:', err);
    });

module.exports = TzadikIdentity;
