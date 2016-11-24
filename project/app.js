/**
 * Created by kreenamehta on 11/23/16.
 */
module.exports = function (app) {
  var model = require("./model/models.server.js")();
  require("./services/user.service.server")(app, model);
};