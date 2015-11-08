var Patient = require('./models/patient');
module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
      res.render('home.ejs')
      if (req.isAuthenticated()) {
          res.render('home.ejs');
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
    require('./routes/alerts.js')(app, passport);

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    console.log("notLoggedIn");

    res.redirect('/');
}
