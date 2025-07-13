const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  expression: String,
  result: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('History', historySchema);
