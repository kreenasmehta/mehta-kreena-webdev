/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("TitleSearchController", TitleSearchController);

    function TitleSearchController(GoogleBooksService) {
        var vm = this;
        vm.searchBookByTitle = searchBookByTitle;


        function init() {
        }
        init();

        /**
         * searches books by title
         * @param title
         */
        function searchBookByTitle(title) {
            GoogleBooksService
                .searchBookByTitle(title)
                .success(function (books) {
                    vm.books = books.items;
                })
                .error(function (error) {

                });
        }
    }
})();