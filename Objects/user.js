const Sequelize = require('sequelize');
// const { DataTypes } = Sequelize;
const sequelize = new Sequelize("tzadik", "postgres", "okokokok", {
    host: 'localhost',
    port: '5433',
    dialect: 'postgres'
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
