var Patient = require('../models/patient');
var User = require('../models/user');
var _ = require('lodash');

module.exports = function (app, passport, isLoggedIn) {
  app.get('/patients',isLoggedIn, function (req, res) {

    var query = Patient.find({});
    query.where('_id').in(req.user.patient);

    query.exec(function (err,patients) {
      res.render('patient/list.ejs', {
        patients: patients
      });
    });
  })

  app.post('/patients/create', isLoggedIn, function (req, res) {

    User.findOne({_id: req.user._id}, function(err, caregiver) {

      var patient = new Patient({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        caregiver: req.user._id
      });

      caregiver.patient.push(patient._id);

      caregiver.save();

      patient.save();
      res.redirect('/');
    })

  })

  app.get('/patients/create', isLoggedIn, function (req, res) {
    res.render('patient/create.ejs');
  })

  app.post('/patients/last_known_position', function(req, res) {
    var location_x = req.body.x;
    var location_y = req.body.y;

    Patient.findOne({_id: "563f57fc04e428b37dfd033a"}, function (err, patient) {
      patient.last_known_position.x = location_x;
      patient.last_known_position.y = location_y;
      patient.save();

      res.status(200).send('OK');
    })


  });

  app.get('/patients/:id', isLoggedIn, isAuthorized, function(req, res) {
    Patient.findOne({_id:req.params.id}, function (err, patient) {
      if (!err) {
        res.render('patient/profile.ejs',{
          patient: patient
        });
      }
    })

  })



}

function isAuthorized(req, res, next) {
  User.findOne({ _id : req.user._id }, function(err, user) {
    var exists = _.find(user.patient, function(patient) {
      if (patient == req.params.id) {
        return true;
      }

      return false;
    })

    if (exists) {
      return next();
    }

    req.flash("error", "Not Authorized to Access Records");
    res.redirect("/");
  })
}
