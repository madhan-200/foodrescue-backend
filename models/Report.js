const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Adduser', required: true },
  reportType: { type: String, required: true },  // e.g., "issue", "feedback"
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Report', reportSchema);