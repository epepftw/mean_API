const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Role = require('../models/role');
const mongoose = require('mongoose');

//Register
router.post('/register', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        role_id: req.body.role_id,
        role_name: req.body.role_name,
        address: req.body.address
    });

    console.log('User', User, newUser)

    User.addUser(newUser, (err, user) => {
        if(err){
            console.log(err)
            res.json({success: false, msg:'Failed to register user'});
        }
        else{
            res.json({success: true, msg:'User registered'});
        }
    });
});

//Authenticate
router.post('/authenticate',  (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, async (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        const role = await Role.findById(user.role_id)

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {
                res.status(500).send({
                    error: 'Mali ang enter mo'
                })
            };

            if(isMatch){ 
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 Week
                });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user:{
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                    },
                    role: role
                });
            }else{
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

//Users
router.get('/', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    // res.status(200).send(await User.find())

    const users = await User.aggregate([
        {
            $lookup: {
                from: 'roles',
                localField: 'role_id',
                foreignField: 'refId',
                as: 'roleDetails'
            }
        }
    ])

    res.status(200).send(users)
})

//Advertisers
router.get('/advertisers', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    try{
        // Get Advertiser Info
        const advertiser = await User.find({"role_name" : "Advertiser"})
        res.status(200).send(advertiser)
    } 
    
    catch(error) {
        console.log(error)
        res.status(500).send({ message: 'wrong'})
    }
})

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});


module.exports = router;