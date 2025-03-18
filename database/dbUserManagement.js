const mongoose = require('mongoose');

let isConnected;

const connectUserManagementDB = async () => {
    if (isConnected) {
        console.log('Using existing MongoDB connection for User Management database');
        return;
    }
    try {
        const conn = await mongoose.createConnection('mongodb://localhost:27017/Usermanagement');
        isConnected = conn.readyState === 1;
        console.log('MongoDB Connected to User Management database');
    } catch (error) {
        console.error('Error connecting to User Management database:', error);
        process.exit(1);
    }
};

module.exports = connectUserManagementDB;
