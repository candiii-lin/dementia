var alertController = require('../controller/alerts');

module.exports = function (app, passport) {
  app.post('/alerts', function (req, res) {
     alertController.recieveAlert("563f57fc04e428b37dfd033a", function () {
       res.status(200).send('OK');
     });
  });

  app.post('/notmoving', function (req, res) {
    alertController.recieveNotMoving("563f57fc04e428b37dfd033a", function () {
      res.status(200).send('OK');
    });
  })
}
