/**
 * Created by kreenamehta on 11/23/16.
 */
module.exports = function (app) {
  require("./services/user.service.server")(app);
};