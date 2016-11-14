/**
 * Created by kreenamehta on 11/13/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam-fall-2016');

    var userModel = require("./user/user.model.server.js")();

    var model = {
      userModel: userModel
    };
    return model;
};
