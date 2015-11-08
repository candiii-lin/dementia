var mongoose = require('mongoose');

var patientSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  birth_date: Date,
  caregiver : { type:mongoose.Schema.ObjectId, ref:"Patient" }
});

module.exports = mongoose.model('Patient', patientSchema);
