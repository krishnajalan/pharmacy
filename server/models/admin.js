const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim : true,
    },
    name: { 
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    admin: Boolean
},{ timestamps: true });

const Admin = mongoose.model('admin', userSchema);

module.exports = Admin;