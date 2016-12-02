/**
 * Created by kreenamehta on 12/2/16.
 */
(function () {
    angular
        .module("BooksApp")
        .factory("BookshelfService", BookshelfService);

    function BookshelfService($http) {

        var api = {
            addToBookshelf: addToBookshelf,
            getBookFromBookshelf: getBookFromBookshelf
        };

        return api;

        function addToBookshelf(userId, bookId) {
            var url = "/api/user/"+userId+"/bookshelf/book/"+bookId;
            return $http.post(url)
        }

        function getBookFromBookshelf(userId, bookId) {
            var url = "/api/user/"+userId+"/bookshelf/book/"+bookId;
            return $http.get(url);
        }
    }
})();