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
            getReviewsOfBook: getReviewsOfBook

        };

        return api;

        function addReview(review, reviewer, book) {
            var newReview = {
                _book: book.id,
                title: book.volumeInfo.title,
                firstName: reviewer.firstName,
                lastName: reviewer.lastName,
                review: review
            };
            var url = "/api/user/"+reviewer._id+"/book/"+book.id+"/review";
            return $http.post(url, newReview);
        }

        function getReviewsOfBook(bookId) {
            var url = "/api/book/"+bookId+"/review";
            return $http.get(url);
        }
    }
})();