const express = require('express');
const router = express.Router();
const config = require('../config/database');
const MediaFile = require('../models/mediaFile');
const passport = require('passport');

//Add
router.post('/add', passport.authenticate('jwt', {session:false}), (req, res, next) => {


    let newMediaFile = new MediaFile({
        _id: req.body.MediaFile_id,
        filename: req.body.filename,
        file_url: req.body.file_url,
        uploaded_by: req.body.uploaded_by,
        date_uploaded: req.body.date_uploaded
    });
    console.log('MediaFile', MediaFile, newMediaFile)

    MediaFile.addMediaFile(newMediaFile, (err, MediaFile) => {
        if(err){
            res.json({success: false, msg:'Failed to add MediaFile'});
        }else{
            res.json({success: true, msg:'MediaFile added'});
        }
    });
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