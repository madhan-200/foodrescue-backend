const User = require('../database/models/User');
const deleteUser = require('../services/deleteUser');

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await deleteUser(userId); 
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
