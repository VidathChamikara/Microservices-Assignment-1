const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    id:{type: String, require: true},
    name:{type: String, require: true},
    role:{type: String, require: true},
    email:{type: String, require: true, unique: true,match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
    password:{type: String, require: true},
    address:{type: String, require: true},
});

UserSchema.index({ name: 1, password: 1 }, { unique: true });
UserSchema.plugin(uniqueValidator,{
    message: 'Error, {VALUE} is already exists.'
});

module.exports = mongoose.model('User', UserSchema);