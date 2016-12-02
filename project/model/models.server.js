/**
 * Created by kreenamehta on 11/23/16.
 */
module.exports = function () {

    var connectionString = process.env.MONGODB_URI || 'mongodb://localhost/kreeative-minds';

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")();
    var bookshelfModel = require("./bookshelf/bookshelf.model.server.js")();

    var model = {
        userModel: userModel,
        bookshelfModel: bookshelfModel
    };
    return model;
};