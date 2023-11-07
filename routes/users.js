const express = require("express")
var bodyParser = require('body-parser')
const User = require('../Objects/user')
const TzadikReport = require('../Objects/tzadik_report');
const TzadikIdentity = require('../Objects/tzadik_identity')
const router = express.Router()
const Sequelize = require("sequelize")
const sequelize = new Sequelize("tzadik", "postgres", "okokokok", {
    host: 'localhost',
    port: '5433',
    dialect: 'postgres'
});

router.get('/', (req, res) =>{
    sequelize.authenticate().then(()=>{
        res.send("connected to the DB")
    }).catch((err)=>{
        res.send(err)
    })
})

//add new user
router.post('/add_user', (req, res) =>{
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

//get user by id and password and return if exist
router.get('/login/:personal_id/:password', (req, res)=>{
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
        if (user.password == password)
        {
            console.log('log in success');
            res.status(201).json({ message: 'User logged in successfully' });
        }
        else
        {
            console.error('incorrect password for id: ', id);
            res.status(500).json({ error: 'incorrect password ' , axpected_pass : user.password, actual_password: password});
        }
    })
})

//update first name for user
router.put('/update_first_name/:personal_id/:first_name', (req, res)=>{
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
    })});

//delete user by id
router.delete('/delete/:id/:first_name', (req, res)=>{
    User.destroy({
        where: {
          personal_id: req.params.id,
          first_name: req.params.first_name
        }
      })
    res.send(`Delete User With ID ${req.params.id}`)})

router
  .route("/action/:id/:last_name")
  .get((req, res) => {
    console.log(req.user)
    res.send(`Get User With ID ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`)
  })
  .delete((req, res) => {
    User.destroy({
        where: {
          personal_id: req.params.id,
          last_name: req.params.last_name
        },
      })
    res.send(`Delete User With ID ${req.params.id}`)
  })

module.exports = router