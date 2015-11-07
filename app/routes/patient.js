module.exports = function (app, passport, isLoggedIn) {
  app.get('/patients/create', isLoggedIn, function (req, res) {
    res.render('patient/create.ejs');
  })

  app.post('/patients/create', isLoggedIn, function (req, res) {
    console.log(req.body);
    res.status(200).send('OK');
  })
}
