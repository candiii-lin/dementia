var Firebase = require('firebase');
var moment = require('moment');
var Patient = require('../models/patient');

var motherload = new Firebase("https://dementia.firebaseio.com/");

exports.recieveAlert = function (dark, x,y,patientID, callback) {
  var alert = {};

  var patient = Patient.findOne({_id: patientID}, function(err, pat) {
      pati = motherload.child(JSON.stringify(pat.caregiver));

      alert.name = pat.first_name + " " +  pat.last_name;
      alert.timestamp = moment().format();
      alert.type = "Fall";

      console.log(x,y)

      if (dark=="TRUE") {
        pat.is_in_dark = true;
      } else {
        pat.is_in_dark = false;
      }
      pat.last_known_position.x = x;
      pat.last_known_position.y = y;

      pat.save();
      pati.push(alert);

      callback();

  })

}


exports.recieveNotMoving = function (dark, x,y,patientID, callback) {
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

      pat.last_known_position.x = x;
      pat.last_known_position.y = y;

      pat.save();
      pati.push(alert);

      callback();

  })
}
