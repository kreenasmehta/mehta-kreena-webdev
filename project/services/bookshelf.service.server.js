/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function (app, model) {

    app.post('/api/user/:uid/bookshelf/book/:bid', addToBookshelf);
    app.get('/api/user/:uid/bookshelf/book/:bid', getBookFromBookshelf);

    function addToBookshelf(req, res) {
        var userId = req.params.uid;
        var bookId = req.params.bid;
        model.bookshelfModel
            .addToBookshelf(userId, bookId)
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

    function getBookFromBookshelf(req, res) {
        var userId = req.params.uid;
        var bookId = req.params.bid;
        model.bookshelfModel
            .getBookFromBookshelf(userId, bookId)
            .then(
                function (bookshelfEntry) {
                    console.log(bookshelfEntry);
                    res.json(bookshelfEntry);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }
};