const mongoose = require('mongoose');
const volunteerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  pronouns: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mailingAddress: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  mobilePhone: {
    type: String,
    required: true,
  },
});


const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
