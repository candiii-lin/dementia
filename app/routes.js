var Patient = require('./models/patient');
module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
      if (req.isAuthenticated()) {
          var query = Patient.find({});
          query.where('_id').in(req.user.patient);

          query.exec(function (err,patients) {
            res.render('home.ejs', {
              patients: patients
            });
          });

      } else {
          res.render('index.ejs');
      }
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    require('./routes/authentication.js')(app, passport, isLoggedIn);
    require('./routes/patient.js')(app, passport, isLoggedIn);

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    console.log("notLoggedIn");

    res.redirect('/');
}
