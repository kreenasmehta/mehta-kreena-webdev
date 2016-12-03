/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var ReviewSchema = require("./review.schema.server")();
    var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

    var api = {
        addReview: addReview,
        getReviewsOfBook: getReviewsOfBook,
        editReview: editReview
    };
    return api;

    /**
     * add review
     * @param newReview
     * @returns {newReview}
     */
    function addReview(newReview) {
        return ReviewModel.create(newReview);
    }

    /**
     * get all reviews of a given bookId
     * @param bookId
     * @returns {Query|*|{}}
     */
    function getReviewsOfBook(bookId) {
        return ReviewModel.find(
            {
                _book: bookId
            }
        );
    }

    /**
     * edit a review
     * @param reviewId
     * @param review
     * @returns {*|Query}
     */
    function editReview(reviewId, review) {
        return ReviewModel.update(
            {
                _id: reviewId
            }, {
                review: review
            }
        );
    }

};