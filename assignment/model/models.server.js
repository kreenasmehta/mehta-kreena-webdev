/**
 * Created by kreenamehta on 11/13/16.
 */
module.exports = function () {

    var connectionString ='mongodb://localhost/wam-fall-2016' || 'mongodb://heroku_m7fj4xln:8Unique#@ds035796.mlab.com:35796/heroku_m7fj4xln';

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")();

    var model = {
      userModel: userModel
    };
    return model;
};
