/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function (app, model) {

    app.post('/api/user/:uid/book/:bid/review', addReview);
    app.get('/api/book/:bid/review', getReviewsOfBook);

    function addReview(req, res) {
        var newReview = req.body;
        model.reviewModel
            .addReview(newReview)
            .then(
                function (review) {
                    res.json(review);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function getReviewsOfBook(req, res) {
        var bookId = req.params.bid;
        model.reviewModel
            .getReviewsOfBook(bookId)
            .then(
                function (bookReviews) {
                    res.json(bookReviews);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );

    }
};