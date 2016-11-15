/**
 * Created by kreenamehta on 11/13/16.
 */
module.exports = function () {

    var connectionString = process.env.MONGODB_URI || 'mongodb://localhost/wam-fall-2016';

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel
    };
    return model;
};
