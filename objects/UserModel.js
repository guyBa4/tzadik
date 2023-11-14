const Sequelize = require('sequelize');
const sequelize = require('../dal/DB');


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
