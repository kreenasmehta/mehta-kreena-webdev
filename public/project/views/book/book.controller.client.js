/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("BookDetailsController", BookDetailsController);

    function BookDetailsController($routeParams, GoogleBooksService, $sce, UserService, BookshelfService) {
        var vm = this;
        var bookId = $routeParams['bid'];
        vm.checkSafeHtml = checkSafeHtml;
        vm.addToBookshelf = addToBookshelf;
        checkLogin = checkLogin;
        // checkIfBookIsInBookshelf = checkIfBookIsInBookshelf;

        function init() {
            checkLogin();
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

        function checkLogin() {
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

        // function checkIfBookIsInBookshelf() {
        //     BookshelfService
        //         .getBookFromBookshelf(vm.currentUser._id, bookId)
        //         .success(function (bookshelfEntry) {
        //             if(bookshelfEntry){
        //                 return true;
        //             } else{
        //                 return false;
        //             }
        //         })
        //         .error(function () {
        //
        //         });
        //
        // }

        function addToBookshelf() {
            if(vm.loggedIn==false){
                vm.error = "Please login/register to add '" + vm.book.volumeInfo.title + "' to your bookshelf.";
            }else{
                BookshelfService
                    .getBookFromBookshelf(vm.currentUser._id, bookId)
                    .success(function (bookshelfEntry) {
                        if(bookshelfEntry){
                            vm.info = "'"+vm.book.volumeInfo.title+"' is already added to your bookshelf."
                        } else{
                            BookshelfService
                                .addToBookshelf(vm.currentUser._id, bookId)
                                .success(function (bookshelfEntry) {
                                    if(bookshelfEntry){
                                        vm.successfulAdd = "'"+vm.book.volumeInfo.title+"' has been added to your bookshelf."
                                    }else{
                                        console.log("error in adding");
                                    }
                                })
                                .error(function (error) {

                                });
                        }
                    })
                    .error(function () {

                    });
            }
        }



        // function addToBookshelf() {
        //     if(vm.loggedIn==false){
        //         vm.error = "Please login/register to add '" + vm.book.volumeInfo.title + "' to your bookshelf.";
        //     } else{
        //         if(checkIfBookIsInBookshelf()){
        //             vm.info = "'"+vm.book.volumeInfo.title+"' is already added to your bookshelf."
        //         } else{
        //             BookshelfService
        //                 .addToBookshelf(vm.currentUser._id, bookId)
        //                 .success(function (bookshelfEntry) {
        //                     if(bookshelfEntry){
        //                         vm.successfulAdd = "'"+vm.book.volumeInfo.title+"' has been added to your bookshelf."
        //                     }else{
        //                         console.log("error in adding");
        //                     }
        //                 })
        //                 .error(function (error) {
        //
        //                 });
        //         }
        //     }
        // }


    }
})();