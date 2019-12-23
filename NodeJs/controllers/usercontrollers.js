const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { User } = require('../models/User');

// => localhost:3000/user/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); } 
        else { console.log('Error in retrieving Users :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :' +req.params.id);
    
    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retrieving Users :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req,res) => {
    var use = new User( {
        name: req.body.name,
        age: req.body.age,
        city: req.body.city,
        email: req.body.email,
    });
    use.save((err,doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error in Saving : ' + JSON.stringify(err,undefined,2)); }
    });
 });

 router.put('/:id', (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :' +req.params.id);


    var use = {
        name: req.body.name,
        age: req.body.age,
        city: req.body.city,
        email: req.body.email,
    };
    
    User.findByIdAndUpdate(req.params.id, {$set, use}, {new:true}, (err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :' +req.params.id);


    var use = {
        name: req.body.name,
        age: req.body.age,
        city: req.body.city,
        email: req.body.email,
    };
    
    User.findByIdAndRemove(req.params.id, (err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;