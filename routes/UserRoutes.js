const express = require("express")
var bodyParser = require('body-parser')
const User = require('../objects/UserModel')
const TzadikReport = require('../objects/TzadikReportsModel');
const TzadikIdentity = require('../objects/TzadikIdentityModel')
const router = express.Router()
const Sequelize = require("sequelize")
const sequelize = require('../dal/DB');
const SecurityController = require('../controllers/SecurityController'); // Import the SecurityController


router.get('/', (req, res) =>{
    sequelize.authenticate().then(()=>{
        res.send("connected to the DB")
    }).catch((err)=>{
        res.send(err)
    })
})


//get user by id and password and return if exist
router.post('/Login/:personal_id/:password', (req, res)=>{
    id = req.params.personal_id;
    password = req.params.password;
    const user = User.findOne({
        where:{
            personal_id: id
        }
    }).then((user)=>{
        if (user === null){
            console.error('error finding user with id: ', id);
            res.status(500).json({ error: 'user not exists' });
        }
        if (user.password == password) // correct password
        {
            console.log('log in success');
                // Modify the sign function call
            SecurityController.signToken(user, (err, token) => {
            if (err) {
                // Handle error
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({
            message: 'User logged in successfully',
            user: user,
            token,
        });
    });
        }
        else // incorrect password
        {
            console.error('incorrect password for id: ', id);
            res.status(500).json({ error: 'incorrect password ' , axpected_pass : user.password, actual_password: password});
        }
    })
})

//update first name for user
router.put('/UpdateFirstName/:personal_id/:first_name', SecurityController.verifyToken, (req, res)=>{
    id = req.params.personal_id;
    first_name = req.params.first_name;
    const user = User.findOne({
        where:{
            personal_id: id
        }
    }).then((user)=>{
        if (user === null){
            console.error('error finding user with id: ', id);
            res.status(500).json({ error: 'user not exists' });
        }
        user.first_name = first_name;
        user.save();
        console.log('update first name success');
        res.status(201).json({ message: 'User update first name successfully' });
})    
});


//add new user
router.post('/AddUser', (req, res) =>{
    body = req.body;
    const newUser = User.build(body);
    newUser.save()
    .then(() => {
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully' });
    })
    .catch(err => {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

});


//delete user by id
router.delete('/Delete/:id/:first_name', (req, res)=>{
    User.destroy({
        where: {
          personal_id: req.params.id,
          first_name: req.params.first_name
        }
      })
    res.send(`Delete User With ID ${req.params.id}`)})


module.exports = router