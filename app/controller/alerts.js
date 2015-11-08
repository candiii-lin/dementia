var Firebase = require('firebase');
var moment = require('moment');
var Patient = require('../models/patient');

var motherload = new Firebase("https://dementia.firebaseio.com/");

exports.recieveAlert = function (alert, patientID, callback) {

  var patient = Patient.findOne({_id: patientID}, function(err, pat) {
      pati = motherload.child(JSON.stringify(pat.caregiver));

      alert.timestamp = moment().format();

      pati.push(alert);

      callback();

  })

}
