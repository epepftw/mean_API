const mongoose = require('mongoose');
const config = require('../config/database');

//Role Schema
const RoleSchema = mongoose.Schema({
    role_name: {
        type: String
    },
    role_slug: {
        type: String
    }
});

const Role = module.exports = mongoose.model('Role', RoleSchema);

module.exports.addRole = function(newRole, callback){
    newRole.save(callback)
}