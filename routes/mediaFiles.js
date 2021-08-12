const express = require('express');
const router = express.Router();
const config = require('../config/database');
const MediaFile = require('../models/mediaFile');
const passport = require('passport');

//Add
router.post('/add', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    try {
        // Checker
        if (typeof(req.body) == 'object' && req.body.length > 0) {
            
            // Loop thru req.body to construct Media Model
            req.body.forEach(async (item) => {

                // 1. Structure the Media File Model
                let newMediaFile = new MediaFile({
                    filename: item.filename,
                    file_url: item.file_url,
                    uploaded_by: item.uploaded_by,
                });
        
        
                // 2. Save the structured Media Model
                await MediaFile.addMediaFile(newMediaFile);
            })
            
            res.json({success: true, msg:'MediaFile added'});
        }
    }   catch (error) {
            console.log('Error on Saving Media File Info', error)
            res.json({success: false, msg:'Failed to add MediaFile'})
    }
});

//Find mediaFile
router.get('/', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    res.status(200).send(await MediaFile.find())
});

//Find by Id
router.get('/:id', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    const mediaFile = await MediaFile.findById(req.params.id);
    res.status(200).send(mediaFile)
});

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