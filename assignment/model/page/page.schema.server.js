/**
 * Created by kreenamehta on 11/15/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
        name: String,
        title: String,
        description: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "page"});

    return PageSchema;
};