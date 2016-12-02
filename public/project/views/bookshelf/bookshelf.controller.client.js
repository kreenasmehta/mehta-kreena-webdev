/**
 * Created by kreenamehta on 12/2/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("BookshelfController", BookshelfController);

    function BookshelfController($routeParams, BookshelfService, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.removeFromBookshelf = removeFromBookshelf;

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
            BookshelfService
                .getBookshelfForUser(userId)
                .success(function (bookshelfEntries) {
                    if(bookshelfEntries.length>0){
                        vm.bookShelfEntries = bookshelfEntries;
                    }else{
                        vm.bookShelfEntries = false;
                    }

                })
                .error(function (error) {

                });
        }
        init();

        function removeFromBookshelf(bookshelfEntryId) {
            BookshelfService
                .removeFromBookshelf(bookshelfEntryId)
                .success(function () {
                    init();
                })
                .error(function () {
                    console.log("error");
                });
        }
    }
})();