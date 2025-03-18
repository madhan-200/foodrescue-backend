const express = require('express');
const cors = require('cors');
const connectUsersDB = require('./database/db'); 
const connectUserManagementDB = require('./database/dbUserManagement'); 
const connectFoodRescueDB = require('./database/dbFoodRescue'); 
const { connectVolunteerDB } = require('./database/dbVolunteer'); 


const addUserRoute = require('./routes/Adduser'); 
const manageUserRoute = require('./routes/ManageUser'); 
const reportRoutes = require('./routes/reportRoutes'); 
const donorRoutes = require('./routes/donorRoutes'); 
const volunteerRoutes = require('./routes/volunteerRoutes'); 

const app = express();


app.use(express.json()); 
app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Welcome to the FOOD RESCUE API');
});


const connectAllDatabases = async () => {
  try {
    await connectUsersDB(); 
    await connectUserManagementDB(); 
    await connectFoodRescueDB(); 
    await connectVolunteerDB(); 
    console.log('All databases connected successfully!');
  } catch (error) {
    console.error('Error connecting to databases:', error);
    process.exit(1); 
  }
};


(async () => {
  await connectAllDatabases();
})();


app.use('/api/users', addUserRoute); 
app.use('/api/users/manage', manageUserRoute); 
app.use('/api/reports', reportRoutes); 
app.use('/api/donors', donorRoutes); 
app.use('/api/Volunteer', volunteerRoutes); 


app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ message: 'An internal server error occurred!', error: err.message });
});


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
