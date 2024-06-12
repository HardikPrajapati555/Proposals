const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  clientName: String,
  startDate: Date,
  duration: String,
  slotDuration: String,
  cities: [String],
  clientType: String,
  propertyType: String,
  plan: String,
  advertiserTag: String,
  popRequired: Boolean,
  geoTaggingRequired: Boolean,
  fileName: String,
  creativeInstruction: String,
  deleted: {
    type: Boolean,
    default: false
  }
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
