const mongoose = require('mongoose');
const config = require('../config/database');

//Media Files Schema
const  MediaFileSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    file_url: {
        type: String,
        required: true
    },
    uploaded_by: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
});

const MediaFile = module.exports = mongoose.model('MediaFile', MediaFileSchema);

module.exports.addMediaFile = function(newMediaFile, callback){
    newMediaFile.save(callback)
}