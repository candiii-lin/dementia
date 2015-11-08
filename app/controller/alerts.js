var Firebase = require('firebase');
var moment = require('moment');
var Patient = require('../models/patient');

var motherload = new Firebase("https://dementia.firebaseio.com/");

exports.recieveAlert = function (dark, patientID, callback) {
  var alert = {};

  var patient = Patient.findOne({_id: patientID}, function(err, pat) {
      pati = motherload.child(JSON.stringify(pat.caregiver));

      alert.name = pat.first_name + " " +  pat.last_name;
      alert.timestamp = moment().format();
      alert.type = "Fall";

      if (dark=="TRUE") {
        pat.is_in_dark = true;
      } else {
        pat.is_in_dark = false;
      }

      pat.save();
      pati.push(alert);

      callback();

  })

}


exports.recieveNotMoving = function (dark, patientID, callback) {
  var alert = {};
  var patient = Patient.findOne({_id: patientID}, function(err, pat) {
      pati = motherload.child(JSON.stringify(pat.caregiver));

      alert.name = pat.first_name + " " +  pat.last_name;
      alert.timestamp = moment().format();
      alert.type = "Not Moving";

      if (dark=="TRUE") {
        pat.is_in_dark = true;
      } else {
        pat.is_in_dark = false;
      }

      pat.save();
      pati.push(alert);

      callback();

  })
}
