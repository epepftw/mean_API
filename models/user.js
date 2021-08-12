const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    phone:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role_name: {
        type: String,
        required: true
    },
    role_id: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username, username}
    User.findOne(query, callback);
}
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            // if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}



module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}