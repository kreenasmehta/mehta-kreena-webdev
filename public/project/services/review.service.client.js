/**
 * Created by kreenamehta on 12/2/16.
 */
(function () {
    angular
        .module("BooksApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {

            addReview: addReview,
            getReviewsOfBook: getReviewsOfBook,
            editReview: editReview,
            deleteReview: deleteReview,
            getAllReviews: getAllReviews

        };

        return api;

        /**
         * add a review
         * @param review
         * @param reviewer
         * @param book
         * @returns {*}
         */
        function addReview(review, reviewer, book) {
            var newReview = {
                _book: book.id,
                title: book.volumeInfo.title,
                _user: reviewer._id,
                firstName: reviewer.firstName,
                lastName: reviewer.lastName,
                review: review
            };
            var url = "/api/user/"+reviewer._id+"/book/"+book.id+"/review";
            return $http.post(url, newReview);
        }

        /**
         * get reviews of a book
         * @param bookId
         * @returns {*}
         */
        function getReviewsOfBook(bookId) {
            var url = "/api/book/"+bookId+"/review";
            return $http.get(url);
        }

        /**
         * edit a review
         * @param reviewId
         * @param review
         * @returns {*}
         */
        function editReview(reviewId, review) {
            var editedReview = {
              review: review
            };
            var url = "/api/review/"+reviewId;
            return $http.put(url, editedReview);
        }

        /**
         * delete a review
         * @param reviewId
         * @returns {*}
         */
        function deleteReview(reviewId) {
            var url = "/api/review/"+reviewId;
            return $http.delete(url);
        }

        /**
         * get all the reviews
         * @returns {*}
         */
        function getAllReviews() {
            var url = "/api/review";
            return $http.get(url);
        }

    }
})();