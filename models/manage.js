const mongoose = require('mongoose');

const ManageUserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    role: { 
        type: String, 
        required: true, 
        enum: ['user', 'admin', 'volunteer'] 
    },
    phone: { 
        type: String, 
        required: true 
    }
});

console.log("manage user db connected")
module.exports = mongoose.model('ManageUser', ManageUserSchema, 'manageusers');