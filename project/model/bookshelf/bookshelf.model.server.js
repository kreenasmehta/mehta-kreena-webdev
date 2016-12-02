/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var BookshelfSchema = require("./bookshelf.schema.server.js")();
    var BookshelfModel = mongoose.model("BookshelfModel", BookshelfSchema);

    var api = {
        addToBookshelf: addToBookshelf,
        getBookFromBookshelf: getBookFromBookshelf,
        getBookshelfForUser: getBookshelfForUser,
        removeFromBookshelf: removeFromBookshelf
    };
    return api;

    function addToBookshelf(userId, bookId, title, authors, frontCover) {
        var bookshelfEntry ={
            _user: userId,
            _book: bookId,
            title: title,
            authors: authors,
            frontCover: frontCover
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

    function getBookshelfForUser(userId) {
        return BookshelfModel.find(
            {
                _user: userId
            }
        );
    }

    function removeFromBookshelf(bookshelfEntryId) {
        return BookshelfModel.remove({_id: bookshelfEntryId});
    }
};