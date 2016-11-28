/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("AuthorSearchController", AuthorSearchController);

    function AuthorSearchController(GoogleBooksService) {
        var vm = this;
        vm.searchBookByAuthor = searchBookByAuthor;

        function init() {
        }
        init();

        /**
         * searches books by author
         * @param author
         */
        function searchBookByAuthor(author) {
            GoogleBooksService
                .searchBookByAuthor(author)
                .success(function (books) {
                    vm.books = books.items;
                })
                .error(function (error) {

                });
        }
    }
})();