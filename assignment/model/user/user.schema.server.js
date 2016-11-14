/**
 * Created by kreenamehta on 11/13/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    /**
     * Implementation of a Mongoose User Schema
     */
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "user"});

    return UserSchema;
};