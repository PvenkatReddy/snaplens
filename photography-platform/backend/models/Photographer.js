const mongoose = require('mongoose');
const PhotographerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  portfolio: [String],
  specialties: [String],
  reviews: [{ user: String, comment: String, rating: Number }]
});

module.exports = mongoose.model('Photographer', PhotographerSchema);
