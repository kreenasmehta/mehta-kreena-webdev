/**
 * Created by kreenamehta on 12/2/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var ReviewSchema = require("./review.schema.server")();
    var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

    var api = {
        addReview: addReview,
        getReviewsOfBook: getReviewsOfBook
    };
    return api;

    function addReview(newReview) {
        return ReviewModel.create(newReview);
    }

    function getReviewsOfBook(bookId) {
        return ReviewModel.find(
            {
                _book: bookId
            }
        );
    }

};