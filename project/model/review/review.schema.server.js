/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var ReviewSchema = mongoose.Schema({
        _book: String,
        title: String,
        _user : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        firstName: String,
        lastName: String,
        review: String,
        dateCreate: {type: Date, default: Date.now()}
    }, {collection: "review"});

    return ReviewSchema;
};