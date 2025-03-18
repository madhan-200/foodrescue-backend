const mongoose = require('mongoose');

let volunteerDBConnection;

const connectVolunteerDB = async () => {
  try {
    if (!volunteerDBConnection) {
      volunteerDBConnection = await mongoose.createConnection('mongodb://localhost:27017/volunteerDB', {
        
      });
      console.log('Successfully connected to the Volunteer database!');
    }
    return volunteerDBConnection;
  } catch (error) {
    console.error('Error connecting to Volunteer DB:', error);
    throw error;
  }
};

module.exports = { connectVolunteerDB };
