const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [String],
  bookingHistory: [String]
});

module.exports = mongoose.model('Customer', CustomerSchema);
