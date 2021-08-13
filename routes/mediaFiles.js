const express = require('express');
const router = express.Router();
const config = require('../config/database');
const MediaFile = require('../models/mediaFile');
const passport = require('passport');
const User = require('../models/user');
const { findById } = require('../models/mediaFile');

//Add
router.post('/add', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    try {
        // Checker
        if (typeof(req.body) == 'object' && req.body.length > 0) {
            console.log(req.body)
            // Loop thru req.body to construct Media Model
            req.body.forEach(async (item) => {
                
                // 1. Structure the Media File Model
                let newMediaFile = new MediaFile({
                    filename: item.filename,
                    file_url: item.file_url,
                    uploaded_by: item.uploaded_by,
                    user_id: item.user_id,
                    mimetype: item.mimetype,
                    size: item.size
                });
        
                
                // 2. Save the structured Media Model
                await MediaFile.addMediaFile(newMediaFile);
            })
            
            res.status(200).json({success: true, msg:'MediaFile added'});
        } else {
            res.status(400).json({success: true, msg:'Invalid payload'});
        }
    }   catch (error) {
            console.log('Error on Saving Media File Info', error)
            res.status(400).json({success: false, msg:'Failed to add MediaFile'})
    }
});

//Find mediaFile
router.get('/', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    res.status(200).send(await MediaFile.find())
});

//Find by Id
router.get('/getByUserId', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    const mediaFile = await MediaFile.find({"user_id" : req.query.userId});
    console.log(req.query.userId)
    res.status(200).send(mediaFile)
});

router.get('/:id', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    res.status(200).send( await MediaFile.findById(req.params.id))
})

//Delete
router.post('/delete', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    await MediaFile.findByIdAndDelete(
        { _id: req.query.id },
        (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        }
    );
});


module.exports = router;