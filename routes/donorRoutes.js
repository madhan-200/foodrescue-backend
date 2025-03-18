const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator'); 
const Donor = require('../models/Donor');  
const router = express.Router();


router.post(
  '/',
  [
    body('donorName').notEmpty().withMessage('Donor name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone').isMobilePhone().withMessage('Invalid phone number'),
    body('foodType').notEmpty().withMessage('Food type is required'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    body('expiryDate').isDate().withMessage('Invalid expiry date'),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { donorName, email, phone, address, foodType, quantity, expiryDate } = req.body;

    try {
      const newDonor = new Donor({
        donorName,
        email,
        phone,
        address,
        foodType,
        quantity,
        expiryDate,
      });

      await newDonor.save();
      res.status(201).json({ message: 'Donor registration successful', donor: newDonor });
    } catch (error) {
      console.error('Error registering donor:', error);
      res.status(500).json({ message: 'Error registering donor' });
    }
  }
);


router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ message: 'Error fetching donors' });
  }
});


router.get('/report', async (req, res) => {
    try {
      const report = await Donor.aggregate([
        {
          $group: {
            _id: "$foodType",  
            totalQuantity: { $sum: "$quantity" },  
            uniqueDonors: { $addToSet: "$email" }  
          }
        },
        {
          $project: {
            foodType: "$_id", 
            totalQuantity: 1,
            totalDonors: { $size: "$uniqueDonors" },  
            _id: 0
          }
        }
      ]);
      res.status(200).json(report);
    } catch (error) {
      console.error('Error generating donor report:', error);
      res.status(500).json({ message: 'Error generating donor report' });
    }
  });
  


router.put('/:id', async (req, res) => {
  const { donorName, email, phone, address, foodType, quantity, expiryDate } = req.body;

  try {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid donor ID' });
    }

    
    if (!donorName || !foodType || !quantity || !expiryDate) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { donorName, email, phone, address, foodType, quantity, expiryDate },
      { new: true }
    );

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.json(donor);
  } catch (error) {
    console.error('Error updating donor:', error);
    res.status(500).json({ message: 'Error updating donor' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
   
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid donor ID' });
    }

    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.status(204).send(); 
  } catch (error) {
    console.error('Error deleting donor:', error);
    res.status(500).json({ message: 'Error deleting donor' });
  }
});

module.exports = router;
