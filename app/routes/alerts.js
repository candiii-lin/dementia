var alertController = require('../controller/alerts');

module.exports = function (app, passport) {
  app.post('/alerts/:id', function (req, res) {
     alertController.recieveAlert(req.body, 131313, function () {
       res.status(200).send('OK');
     });
  });
}
