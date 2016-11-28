/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("BookDetailsController", BookDetailsController);

    function BookDetailsController($routeParams, GoogleBooksService, $sce) {
        var vm = this;
        var bookId = $routeParams['bid'];
        vm.checkSafeHtml = checkSafeHtml;

        function init() {
            GoogleBooksService
                .getBookById(bookId)
                .success(function (book) {
                    vm.book = book;
                })
                .error(function () {

                });
        }
        init();

        /**
         * checks and returns the trusted HTML content
         * @param html
         * @returns {*}
         */
        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();