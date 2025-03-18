const express = require('express');
const router = express.Router();
const User = require('../models/user'); 


router.get('/', async (req, res) => {
    try {
        const { search } = req.query;

        
        let query = {};
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } }, 
                    { email: { $regex: search, $options: 'i' } },
                    { role: { $regex: search, $options: 'i' } },
                ]
            };
        }

        
        const users = await User.find(query).select('name email role createdAt'); 
       
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Failed to fetch user reports.' });
    }
});

module.exports = router;
