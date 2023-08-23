const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    id:{type: String, require: true},
    name:{type: String, require: true},
    role:{type: String, require: true},
    password:{type: String, require: true},
    address:{type: String, require: true},
});

module.exports = mongoose.model('User', UserSchema);