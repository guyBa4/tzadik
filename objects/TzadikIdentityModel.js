const Sequelize = require('sequelize');
const sequelize = require('../dal/DB');

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
