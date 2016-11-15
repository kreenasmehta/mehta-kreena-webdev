/**
 * Created by kreenamehta on 10/24/16.
 */
module.exports = function (app) {
  var model = require("./model/models.server.js")();
  require("./services/user.service.server.js")(app);
  require("./services/website.service.server.js")(app);
  require("./services/page.service.server.js")(app);
  require("./services/widget.service.server.js")(app);
};
