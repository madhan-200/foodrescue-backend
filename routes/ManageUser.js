const express = require('express');
const router = express.Router();
const User = require('../models/user'); 


router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).json({ message: 'Failed to fetch users. Please try again later.' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully!', user });
    } catch (error) {
        console.error("Error while updating user:", error);
        res.status(500).json({ message: 'Failed to update user. Please try again later.' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error("Error while deleting user:", error);
        res.status(500).json({ message: 'Failed to delete user. Please try again later.' });
    }
});

module.exports = router;
