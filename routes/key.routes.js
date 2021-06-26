const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Key = require('../models/key');
const { v4: uuidv4 } = require('uuid');

//Add Key
router.post('/add', (req, res, next) => {

    for (let x = 1; x <= req.query.count; x++) {
        let newKey = new Key({
            key: uuidv4(),
            advertiserId: req.query.advertiserId,
            isActive: false,
            isOnline: false,
            dateCreated: new Date(),
            createdBy: "papod"
        });

        Key.addKey(newKey, (err, Key) => {
            if(err){
                res.json({success: false, msg:'Failed to add Key'});
            }
        });
    } 

    res.json({success: true, msg:`Keys Created for ${req.query.advertiserId}`});
});

//Find by Id
router.get('/:id', async (req, res, next) => {
    const role = await Key.findById(req.params.id);
    res.status(200).send(role)
});

//delete
router.post('/delete', async (req, res, next) => {
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