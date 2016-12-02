/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("GenreSearchController", GenreSearchController);

    function GenreSearchController(GoogleBooksService, UserService) {
        var vm = this;
        vm.searchBookByGenre = searchBookByGenre;

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