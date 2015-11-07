var Firebase = require('firebase');

var motherload = new Firebase("https://dementia.firebaseio.com/");

exports.recieveAlert = function (alert, patientID, callback) {
  var patient = motherload.child(patientID);

  patient.set(alert);

  callback();
}
