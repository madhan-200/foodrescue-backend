const express = require('express');
const { connectVolunteerDB } = require('../database/dbVolunteer'); 
const Volunteer = require('../models/Volunteer'); 

const router = express.Router();


connectVolunteerDB();


router.post('/add', async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, pronouns, gender, mailingAddress, postalCode, city, state, email, mobilePhone } = req.body;

    
    if (!firstName || !lastName || !dateOfBirth || !pronouns || !gender || !mailingAddress || !postalCode || !city || !state || !email || !mobilePhone) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    
    const newVolunteer = new Volunteer({
      firstName,
      lastName,
      dateOfBirth,
      pronouns,
      gender,
      mailingAddress,
      postalCode,
      city,
      state,
      email,
      mobilePhone
    });

    
    await newVolunteer.save();

    res.status(201).json({ message: 'Volunteer registered successfully', volunteer: newVolunteer });
  } catch (error) {
    console.error('Error registering volunteer:', error);
    res.status(500).json({ message: 'Error registering volunteer', error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find(); 
    res.status(200).json(volunteers); 
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ message: 'Error fetching volunteers', error: error.message });
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, dateOfBirth, pronouns, gender, mailingAddress, postalCode, city, state, email, mobilePhone } = req.body;

    
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      { firstName, lastName, dateOfBirth, pronouns, gender, mailingAddress, postalCode, city, state, email, mobilePhone },
      { new: true }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.status(200).json({ message: 'Volunteer updated successfully', volunteer: updatedVolunteer });
  } catch (error) {
    console.error('Error updating volunteer:', error);
    res.status(500).json({ message: 'Error updating volunteer', error: error.message });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    const deletedVolunteer = await Volunteer.findByIdAndDelete(id);

    if (!deletedVolunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.status(200).json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    console.error('Error deleting volunteer:', error);
    res.status(500).json({ message: 'Error deleting volunteer', error: error.message });
  }
});

module.exports = router;
