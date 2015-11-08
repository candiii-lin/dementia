var alertController = require('../controller/alerts');

module.exports = function (app, passport) {
  app.post('/alerts/:id', function (req, res) {
     alertController.recieveAlert(req.body, "563e937b3b6d70fc3131343e", function () {
       res.status(200).send('OK');
     });
  });
}
