/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("TitleSearchController", TitleSearchController);

    function TitleSearchController(GoogleBooksService, UserService) {
        var vm = this;
        vm.searchBookByTitle = searchBookByTitle;


        /**
         * check login on loading the page
         */
        function init() {
            UserService
                .checkLogin()
                .success(function (user) {
                    if(user != '0'){
                        vm.loggedIn = true;
                        vm.currentUser = user;
                    } else{
                        vm.loggedIn = false;
                    }
                })
                .error(function (error) {

                });
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