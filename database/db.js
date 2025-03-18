const mongoose = require('mongoose');

let isConnected;

const connectUsersDB = async () => {
    if (isConnected) {
        console.log('Using existing MongoDB connection for Users database');
        return;
    }
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/Users', {
           
            
        });
        isConnected = conn.connection.readyState === 1;
        console.log('MongoDB Connected to Users database');
    } catch (error) {
        console.error('Error connecting to Users database:', error);
        process.exit(1);
    }
};

module.exports = connectUsersDB;