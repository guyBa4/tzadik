const express = require("express")
var bodyParser = require('body-parser')
const User = require('../objects/UserModel')
const TzadikReport = require('../objects/TzadikReportsModel');
const TzadikIdentity = require('../objects/TzadikIdentityModel')
const router = express.Router()
const Sequelize = require("sequelize")
const sequelize = require('../db');

//add new tzadik report
router.post('/add_report', async (req, res) =>{
    body = req.body;
    const newTzadikReport = await TzadikReport.build(body);
    newTzadikReport.save()
    .then(() => {
        console.log('TzadikReport created successfully');
        res.status(201).json({ message: 'TzadikReport created successfully' });
    })
    .catch(err => {
        console.error('Error creating TzadikReport:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

});

//get tzadik report by id
router.get('/get_by_id/:id/', (req, res)=>{
    const tzadik = TzadikReport.findOne({
        where:{
            id: req.params.id
        }
    }).then((tzadik)=>{
        if (tzadik === null){
            console.error('error finding tzadik report with id: ', id);
            res.status(500).json({ error: 'tzadik report not exists' });
        }
        else
        {
            console.log('tzadik report found');
            res.status(201).json({ tzadik_report : tzadik });
        }
    })
})

//delete report by id
router.delete('/delete/:id', (req, res)=>{
    TzadikReport.destroy({
        where: {
          id: req.params.id,
        }
      })
    res.send(`Delete report With  ${req.params.id}`)})

module.exports = router