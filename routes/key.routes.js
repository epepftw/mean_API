const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Key = require('../models/key');
const Users = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');

//Add Key
router.post('/add', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    try{
        // Get Advertiser Info
        const advertiser = await Users.findById(req.query.advertiserId)

        for (let x = 1; x <= req.query.count; x++) {
            // Structure Payload
            let newKey = new Key({
                key: uuidv4(),
                advertiser: {
                    id: req.query.advertiserId,
                    name: advertiser.name
                },
                isActive: false,
                isOnline: false,
                dateCreated: new Date(),
                createdBy: {
                    id: "54654654654",
                    name: "papod"
                }
            });

            // Submit
            await Key.addKey(newKey, (err, Key) => {
                if(err){
                    throw(err)
                }
            });
        }

        res.json({success: true, msg:`Keys Created for ${req.query.advertiserId}`});
    } catch(error){
        console.log(error)
        res.status(500).send({ message: 'Server'})
    }
    
});

//Find by Id
router.get('/:id', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    const role = await Key.findById(req.params.id);
    res.status(200).send(role)
});

//delete
router.post('/delete', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    await Key.findByIdAndDelete(
        { _id: req.query.id },
        (err, result) => {
            if(err) {
                res.send(err)
            } else {
                res.send(result)
            }
        }
    );
});

module.exports = router;