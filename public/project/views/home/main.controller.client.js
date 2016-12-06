/**
 * Created by kreenamehta on 11/23/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("MainController", MainController);

    function MainController(UserService, GoogleBooksService, $location, ReviewService) {
        var vm = this;
        vm.getBookDetails = getBookDetails;

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
            GoogleBooksService
                .getNewReleasedBooks()
                .success(function (newReleases) {
                    //Displaying only top 6 new release books
                    vm.newReleases = newReleases.items.splice(0,6);
                })
                .then(function (error) {

                });
            ReviewService
                .getAllReviews()
                .success(function (allReviews) {
                    console.log(allReviews);
                    vm.readerReviews = allReviews;
                })
                .error(function (error) {

                });
        }
        init();

        function getBookDetails(bookId) {
            $location.url("/book/"+bookId);
        }
    }
})();