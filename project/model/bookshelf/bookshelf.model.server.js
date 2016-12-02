/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var BookshelfSchema = require("./bookshelf.schema.server.js")();
    var BookshelfModel = mongoose.model("BookshelfModel", BookshelfSchema);

    var api = {
        addToBookshelf: addToBookshelf,
        getBookFromBookshelf: getBookFromBookshelf
    };
    return api;

    function addToBookshelf(userId, bookId) {
        var bookshelfEntry ={
            _user: userId,
            _book: bookId
        };
        return BookshelfModel.create(bookshelfEntry);
    }

    function getBookFromBookshelf(userId, bookId) {
        return BookshelfModel.findOne(
            {
                _user: userId,
                _book: bookId
            }
        );
    }
};