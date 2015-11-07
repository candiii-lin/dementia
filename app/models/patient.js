var mongoose = require('mongoose'),
    relationship = require("mongoose-relationship");

var patientSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  birth_date: Date,
  caregiver: { type:mongoose.Schema.ObjectId, ref:"User", childPath:"patient" }
});

patientSchema.plugin(relationship, { relationshipPathName:'user' });

module.exports = mongoose.model('Patient', patientSchema);
