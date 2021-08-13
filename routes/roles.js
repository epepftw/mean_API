const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Role = require('../models/role');
const passport = require('passport');


//Find role
router.get('/', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    res.status(200).send(await Role.find())
});

//Find by Id
router.get('/:id', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    const role = await Role.findById(req.params.id);
    res.status(200).send(role)
});


//Edit
router.post('/edit', passport.authenticate('jwt', {session:false}), async(req, res, next) => {
    console.log(req.body);
    await Role.findByIdAndUpdate(
        { _id: req.body.role_id },
        { role_name: req.body.role_name },
        (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        }
    );
});

//Delete
router.post('/delete', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    console.log(req.body);
    await Role.findByIdAndDelete(
        { _id: req.body.role_id },
        { role_name: req.body.role_name },
        (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        }
    );
});


//Add
router.post('/add', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let newRole = new Role({
        _id: req.body.role_id,
        role_name: req.body.role_name,
        role_slug: req.body.role_slug
    });
    console.log('Role', Role, newRole)

    Role.addRole(newRole, (err, role) => {
        if(err){
            res.json({success: false, msg:'Failed to add Role'});
        }else{
            res.json({success: true, msg:'Role added'});
        }
    });
});

module.exports = router;