/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("GenreSearchController", GenreSearchController);

    function GenreSearchController(GoogleBooksService) {
        var vm = this;
        vm.searchBookByGenre = searchBookByGenre;

        function init() {
        }
        init();

        /**
         * searches books by genre
         * @param genre
         */
        function searchBookByGenre(genre) {
            GoogleBooksService
                .searchBookByGenre(genre)
                .success(function (books) {
                    vm.books = books.items;
                })
                .error(function (error) {

                });
        }

    }
})();