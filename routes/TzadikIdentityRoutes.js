const express = require("express")
var bodyParser = require('body-parser')
const User = require('../objects/UserModel')
const TzadikReport = require('../objects/TzadikReportsModel');
const TzadikIdentity = require('../objects/TzadikIdentityModel')
const router = express.Router()
const Sequelize = require("sequelize")
const sequelize = require('../db');

//add new tzadik Identity
router.post('/add_tzadik', (req, res) =>{
    body = req.body;
    const newTzadikIdentity = TzadikIdentity.build(body);
    newTzadikIdentity.save()
    .then(() => {
        console.log('TzadikIdentity created successfully');
        res.status(201).json({ message: 'TzadikIdentity created successfully' });
    })
    .catch(err => {
        console.error('Error creating TzadikIdentity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

});

//get get tzadik by id
router.get('/get_by_id/:id/', (req, res)=>{
    const tzadik = TzadikIdentity.findOne({
        where:{
            tzadik_id: req.params.id
        }
    }).then((tzadik)=>{
        if (tzadik === null){
            console.error('error finding tzadik with id: ', id);
            res.status(500).json({ error: 'tzadik not exists' });
        }
        else
        {
            console.log('tzadik found');
            res.status(201).json({ tzadik : tzadik });
        }
    })
})

//update assignment for a tzadik
router.put('/update_assignment/:id/:assign', (req, res)=>{
    id = req.params.id;
    assign = req.params.assign;
    const tzadikIdentity = TzadikIdentity.findOne({
        where:{
            tzadik_id: id
        }
    }).then((tzadikIdentity)=>{
        if (tzadikIdentity === null){
            console.error('error finding tzadik with id: ', id);
            res.status(500).json({ error: 'tzadik not exists' });
        }
        tzadikIdentity.assignment = assign;
        tzadikIdentity.save();
        console.log('update assignment success');
        res.status(201).json({ message: 'User update assignment successfully' });
    })});

//delete tzadik by id
router.delete('/delete/:id', (req, res)=>{
    TzadikIdentity.destroy({
        where: {
          tzadik_id: req.params.id,
        }
      })
    res.send(`Delete tzatik With id ${req.params.id}`)})



module.exports = router