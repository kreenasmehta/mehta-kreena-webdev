/**
 * Created by kreenamehta on 11/23/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "kmuser"});

    return UserSchema;
};