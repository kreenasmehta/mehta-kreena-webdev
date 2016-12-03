/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("AuthorSearchController", AuthorSearchController);

    function AuthorSearchController(GoogleBooksService, UserService) {
        var vm = this;
        vm.searchBookByAuthor = searchBookByAuthor;

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