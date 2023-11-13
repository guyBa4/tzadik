const Sequelize = require('sequelize');
// const { DataTypes } = Sequelize;
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


class User extends Sequelize.Model {}
User.init({
    personal_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
});

sequelize.sync()
    .then(() => {
        console.log('Users table created successfully');
    })
    .catch(err => {
        console.error('Error creating users table:', err);
    });

module.exports = User;
