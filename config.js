require('dotenv').config();

module.exports = {
    mongoUsersURI: process.env.MONGO_USERS_URI,
    mongoFoodRescueURI: process.env.MONGO_FOODRESCUE_URI,
    mongoUserManagementURI: process.env.MONGO_USERMANAGEMENT_URI,
    mongoVolunteerURI: process.env.MONGO_VOLUNTEER_URI,
    port: process.env.PORT || 5000,  // Ensure lowercase "port" to avoid "undefined"
    nodeEnv: process.env.NODE_ENV,
    corsOrigin: process.env.CORS_ORIGIN,
    jwtSecret: process.env.JWT_SECRET
};