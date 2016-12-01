/**
 * Created by kreenamehta on 11/23/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        dob: Date,
        firstName: String,
        lastName: String,
        phone: {type: Number},
        address: String,
        email: String,
        role:{type:String, enum:["READER", "ADMIN"], default:"READER"},
        follows: {type: [mongoose.Schema.Types.ObjectId], ref:"UserModel", default:[]},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "kmuser"});

    return UserSchema;
};