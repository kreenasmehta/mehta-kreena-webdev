/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function (app, model) {

    app.post('/api/user/:uid/book/:bid/review', addReview);
    app.get('/api/book/:bid/review', getReviewsOfBook);
    app.put('/api/review/:rid', editReview);
    app.delete('/api/review/:rid', deleteReview);

    /**
     * add a review for a given book
     * @param req
     * @param res
     */
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

    /**
     * get reviews of a book
     * @param req
     * @param res
     */
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

    /**
     * edit a review
     * @param req
     * @param res
     */
    function editReview(req, res) {
        var reviewId = req.params.rid;
        var review = req.body.review;
        model.reviewModel
            .editReview(reviewId, review)
            .then(
                function (status) {
                    res.send(review);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    /**
     * delete a review
     * @param req
     * @param res
     */
    function deleteReview(req, res) {
        var reviewId = req.params.rid;
        model.reviewModel
            .deleteReview(reviewId)
            .then(
                function () {
                    res.send(200);
                },
                function () {
                    res.send(400);
                }
            );

    }
};