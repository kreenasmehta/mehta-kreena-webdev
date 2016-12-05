/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("GenreSearchController", GenreSearchController);

    function GenreSearchController(GoogleBooksService, UserService, $routeParams, $location) {
        var vm = this;
        vm.searchBookByGenre = searchBookByGenre;
        var genre = $routeParams['genre'];

        /**
         * check login on loading the page
         */
        function init() {
            if(genre){
                vm.genre = genre;
                $location.url("/search/genre/"+genre);
                searchBookByGenre(genre);
            }
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
            $location.url("/search/genre/"+genre);
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