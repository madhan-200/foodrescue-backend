const mongoose = require('mongoose');

const connectFoodRescueDB = async () => {
  try {
    const foodRescueDB = await mongoose.createConnection('mongodb://localhost:27017/foodRescueDB');
    
    foodRescueDB.on('connected', () => {
      console.log('MongoDB connected to foodRescueDB');
    });

    foodRescueDB.on('error', (err) => {
      console.error('Error connecting to foodRescueDB:', err);
      process.exit(1);
    });

    return foodRescueDB;
  } catch (err) {
    console.error('Error connecting to foodRescueDB:', err);
    process.exit(1);
  }
};

module.exports = connectFoodRescueDB;
