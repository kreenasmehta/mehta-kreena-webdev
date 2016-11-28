/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .factory("GoogleBooksService", GoogleBooksService);

    function GoogleBooksService($http) {


        var api ={
            searchBookByTitle: searchBookByTitle,
            searchBookByAuthor: searchBookByAuthor,
            searchBookByGenre: searchBookByGenre,
            getBookById: getBookById
        };

        return api;


        /**
         * get book by bookId
         * @param bookId
         * @returns {*}
         */
        function getBookById(bookId) {
            return $http.get("https://www.googleapis.com/books/v1/volumes/"+bookId);
        }

        /**
         * search books by title
         * @param title
         * @returns {*}
         */
        function searchBookByTitle(title) {
            return $http.get("https://www.googleapis.com/books/v1/volumes?q="+title+"&");
        }

        /**
         * search books by author
         * @param author
         * @returns {*}
         */
        function searchBookByAuthor(author) {
            return $http.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:"+author);
        }

        /**
         * search books by genre
         * @param genre
         * @returns {*}
         */
        function searchBookByGenre(genre) {
            return $http.get("https://www.googleapis.com/books/v1/volumes?q=subject:"+genre);
        }

    }
})();