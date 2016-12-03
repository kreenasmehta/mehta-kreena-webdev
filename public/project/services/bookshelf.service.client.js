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

        /**
         * add a book to bookshelf
         * @param userId
         * @param book
         * @returns {*}
         */
        function addToBookshelf(userId, book) {
            var url = "/api/user/"+userId+"/bookshelf/book/"+book.id;
            return $http.post(url, book)
        }

        /**
         * get a book from bookshelf
         * @param userId
         * @param bookId
         * @returns {*}
         */
        function getBookFromBookshelf(userId, bookId) {
            var url = "/api/user/"+userId+"/bookshelf/book/"+bookId;
            return $http.get(url);
        }

        /**
         * get a bookshelf of a given user
         * @param userId
         * @returns {*}
         */
        function getBookshelfForUser(userId) {
            var url = "/api/user/"+userId+"/bookshelf";
            return $http.get(url);
        }

        /**
         * remove a book from bookshelf
         * @param bookshelfEntryId
         * @returns {*}
         */
        function removeFromBookshelf(bookshelfEntryId) {
            var url = "/api/bookshelf/book/"+bookshelfEntryId;
            return $http.delete(url);
        }
    }
})();