const mongoose = require('mongoose');
const config = require('../config/database');

//Keys Schema
const KeyFileSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
});

const Key = module.exports = mongoose.model('Key', KeyFileSchema);

module.exports.addKey = function(newKey, callback){
    newKey.save(callback);
}

