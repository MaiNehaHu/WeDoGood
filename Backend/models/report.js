const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  ngoId: { type: String, required: true },
  month: { type: String, required: true }, // format: YYYY-MM
  peopleHelped: { type: Number, required: true },
  eventsConducted: { type: Number, required: true },
  fundsUtilized: { type: Number, required: true },
});

module.exports = mongoose.model('Report', reportSchema);
