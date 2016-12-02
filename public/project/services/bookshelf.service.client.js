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
            getBookFromBookshelf: getBookFromBookshelf,
            getBookshelfForUser: getBookshelfForUser,
            removeFromBookshelf: removeFromBookshelf
        };

        return api;

        function addToBookshelf(userId, book) {
            var url = "/api/user/"+userId+"/bookshelf/book/"+book.id;
            return $http.post(url, book)
        }

        function getBookFromBookshelf(userId, bookId) {
            var url = "/api/user/"+userId+"/bookshelf/book/"+bookId;
            return $http.get(url);
        }

        function getBookshelfForUser(userId) {
            var url = "/api/user/"+userId+"/bookshelf";
            return $http.get(url);
        }

        function removeFromBookshelf(bookshelfEntryId) {
            var url = "/api/bookshelf/book/"+bookshelfEntryId;
            return $http.delete(url);
        }
    }
})();