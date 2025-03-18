const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['user', 'admin', 'volunteer'] },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('User', UserSchema);
