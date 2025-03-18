const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/add-user', async (req, res) => {
    console.log("Request Body:", req.body);
    try {
        const { name, email, role, phone } = req.body;
        const newUser = new User({ name, email, role, phone });

        const savedUser = await newUser.save();
        console.log("Saved User:", savedUser);

        res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
        console.error("Error:", error);
        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;