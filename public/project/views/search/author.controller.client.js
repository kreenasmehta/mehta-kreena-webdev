/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("AuthorSearchController", AuthorSearchController);

    function AuthorSearchController(GoogleBooksService, UserService, $routeParams, $location) {
        var vm = this;
        vm.searchBookByAuthor = searchBookByAuthor;
        var author = $routeParams['author'];

        /**
         * check login on loading the page
         */
        function init() {
            if(author){
                vm.author = author;
                $location.url("/search/author/"+author);
                searchBookByAuthor(author);
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
         * searches books by author
         * @param author
         */
        function searchBookByAuthor(author) {
            $location.url("/search/author/"+author);
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