/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var BookshelfSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        _book : String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "bookshelf"});

    return BookshelfSchema;
};