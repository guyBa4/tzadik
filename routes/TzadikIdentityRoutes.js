const express = require("express")
var bodyParser = require('body-parser')
const User = require('../objects/UserModel')
const TzadikReport = require('../objects/TzadikReportsModel');
const TzadikIdentity = require('../objects/TzadikIdentityModel')
const router = express.Router()
const Sequelize = require("sequelize")
const sequelize = require('../dal/DB');
const SecurityController = require('../controllers/SecurityController');
const Modelcontroller = require('../controllers/ModelsController');

//add new tzadik Identity
router.post('/AddTzadik', SecurityController.verifyToken, (req, res) =>{
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


router.get('/GetById/:id/', SecurityController.verifyToken, async (req, res) => {
    try {
        const tzadikId = req.params.id;
        const tzadik = await Modelcontroller.getTzadikById(tzadikId);
        if (tzadik === null) {
            console.error('Error finding tzadik with id: ', tzadikId);
            res.status(500).json({ error: 'Tzadik does not exist' });
        } else {
            console.log('Tzadik found');
            res.status(201).json({ tzadik: tzadik });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//update assignment for a tzadik
router.put('/UpdateAssignment/:id/:assign', SecurityController.verifyToken, async (req, res)=>{
    try
    {
        assign = req.params.assign;
        const tzadikId = req.params.id;
        const tzadik = await Modelcontroller.getTzadikById(tzadikId);
        if (tzadikIdentity === null){
            console.error('error finding tzadik with id: ', id);
            res.status(500).json({ error: 'tzadik not exists' });
        }
        else{
            tzadikIdentity.assignment = assign;
            tzadikIdentity.save();
            console.log('update assignment success');
            res.status(201).json({ message: 'User update assignment successfully' });
        }
    }
    catch (error) 
    {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });

    }
});
//delete tzadik by id
router.delete('/Delete/:id', SecurityController.verifyToken, (req, res)=>{
    TzadikIdentity.destroy({
        where: {
          tzadik_id: req.params.id,
        }
      })
    res.send(`Delete tzatik With id ${req.params.id}`)})



module.exports = router