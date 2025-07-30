const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  content: { type: String, required: true },
  inputType: { type: String, enum: ['text', 'url', 'title'], default: 'text' },
  result: { type: String, required: true }, // 'fake' or 'real'
  explanation: { type: String },
  confidenceScore: { type: Number, min: 0, max: 100 },
  suspicionScore: { type: String },
  detailsForConfidence: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);