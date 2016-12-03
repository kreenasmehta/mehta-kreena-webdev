/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function (app, model) {

    app.post('/api/user/:uid/bookshelf/book/:bid', addToBookshelf);
    app.get('/api/user/:uid/bookshelf/book/:bid', getBookFromBookshelf);
    app.get('/api/user/:uid/bookshelf', getBookshelfForUser);
    app.delete('/api/bookshelf/book/:bseid', removeFromBookshelf);

    /**
     * add book to bookshelf
     * @param req
     * @param res
     */
    function addToBookshelf(req, res) {
        var userId = req.params.uid;
        var bookId = req.params.bid;
        var book = req.body;
        var frontCover = book.volumeInfo.imageLinks.thumbnail;
        var title = book.volumeInfo.title;
        var author = book.volumeInfo.authors;
        model.bookshelfModel
            .addToBookshelf(userId, bookId, title, author, frontCover)
            .then(
                function (bookshelfEntry) {
                    if(bookshelfEntry){
                        res.json(bookshelfEntry);
                    }
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    /**
     * get book from bookshelf
     * @param req
     * @param res
     */
    function getBookFromBookshelf(req, res) {
        var userId = req.params.uid;
        var bookId = req.params.bid;
        model.bookshelfModel
            .getBookFromBookshelf(userId, bookId)
            .then(
                function (bookshelfEntry) {
                    res.json(bookshelfEntry);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    /**
     * get a bookshelf of a given user
     * @param req
     * @param res
     */
    function getBookshelfForUser(req, res) {
        var userId = req.params.uid;
        model.bookshelfModel
            .getBookshelfForUser(userId)
            .then(
                function (bookshelfEntries) {
                    res.json(bookshelfEntries);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    /**
     * remove a book from bookshelf
     * @param req
     * @param res
     */
    function removeFromBookshelf(req, res) {
        var bookshelfEntryId = req.params.bseid;
        model.bookshelfModel
            .removeFromBookshelf(bookshelfEntryId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );

    }
};