/**
 * Created by kreenamehta on 11/14/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        description: String,
        pages: {type:[mongoose.Schema.Types.ObjectId], default: []},
        dateCreated:{type: Date, default: Date.now()}
    }, {collection: "website"});

    return WebsiteSchema;
};
