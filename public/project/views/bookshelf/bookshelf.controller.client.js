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

        /**
         * check login, get a bookshelf for a user, find the bookshelf owner on loading the page
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
            UserService
                .findUserByID(userId)
                .success(function (bookShelfOwner) {
                    vm.bookshelfOwner = bookShelfOwner;
                })
                .error(function (error) {

                });
        }
        init();

        /**
         * remove a book from bookshelf if the currently logged in user if the bookshelf owner
         * @param bookshelfEntryId
         * @param bookshelfOwnerId
         */
        function removeFromBookshelf(bookshelfEntryId, bookshelfOwnerId) {
            if(vm.loggedIn == false){
                vm.removeError = "Please login/regiter to remove a book from the bookshelf.";
            } else{
                if(bookshelfOwnerId != vm.currentUser._id){
                    vm.removeError = "You cannot remove books from another reader's bookshelf."
                } else{
                    BookshelfService
                        .removeFromBookshelf(bookshelfEntryId)
                        .success(function () {
                            init();
                        })
                        .error(function () {

                        });
                }

            }

        }
    }
})();