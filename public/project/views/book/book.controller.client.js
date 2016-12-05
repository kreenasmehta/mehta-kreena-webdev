/**
 * Created by kreenamehta on 11/28/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("BookDetailsController", BookDetailsController);

    function BookDetailsController($routeParams, GoogleBooksService, $sce,
                                   UserService, BookshelfService, ReviewService, $location) {
        var vm = this;
        var bookId = $routeParams['bid'];
        vm.checkSafeHtml = checkSafeHtml;
        vm.addToBookshelf = addToBookshelf;
        checkLogin = checkLogin;
        vm.addReview = addReview;
        vm.showEditButton = showEditButton;
        vm.editReview = editReview;
        vm.deleteReview = deleteReview;
        vm.back = back;
        var title = $routeParams['title'];
        var author = $routeParams['author'];
        var genre = $routeParams['genre'];

        /**
         * checklogin, get reviews of a book on loading the page
         */
        function init() {
            checkLogin();
            GoogleBooksService
                .getBookById(bookId)
                .success(function (book) {
                    vm.book = book;
                })
                .error(function () {

                });
            ReviewService
                .getReviewsOfBook(bookId)
                .success(function (bookReviews) {
                    if(bookReviews.length == 0){
                        vm.firstReviewer = "Be first one to review!"
                    } else{
                        vm.firstReviewer = false;
                        vm.reviews = bookReviews;
                    }

                })
                .error(function (error) {
                    
                });
            vm.review = "";
            vm.enableEdit = false;
            vm.reviewError = false;

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

        /**
         * check login
         */
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

        /**
         * add a book to bookshelf
         */
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
                                .addToBookshelf(vm.currentUser._id, vm.book)
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

        /**
         * add a review
         * @param review
         */
        function addReview(review) {
            if(vm.loggedIn == false){
                vm.reviewError = "Please login/register to write a review on '" + vm.book.volumeInfo.title +"'";
            }else{
                ReviewService
                    .addReview(review, vm.currentUser, vm.book)
                    .success(function (review) {
                        init();
                    })
                    .error(function () {

                    });
            }
        }

        /**
         * show edit button if the user has permissions to edit the review
         * @param reviewId
         * @param reviewerId
         * @param review
         */
        function showEditButton(reviewId, reviewerId, review) {
            if(vm.loggedIn == false){
                vm.reviewError = "Please login/register to edit a review on '" + vm.book.volumeInfo.title +"'";
            } else{
                if(reviewerId != vm.currentUser._id){
                    vm.enableEdit = false;
                    vm.reviewError = "You cannot edit other reader's review."
                }else{
                    vm.reviewId = reviewId;
                    vm.reviewError = false;
                    vm.review = review;
                    vm.enableEdit = true;
                }
            }

        }

        /**
         * edit a review
         * @param reviewId
         * @param review
         */
        function editReview(reviewId, review) {
            ReviewService
                .editReview(reviewId, review)
                .success(function (review) {
                    init();
                })
                .error(function () {
                    
                });
        }

        /**
         * delete a review if the current user has permissions to delete it, else show appropriate error message.
         * @param review
         */
        function deleteReview(review) {
            if(vm.loggedIn == false){
                vm.reviewError = "Please login/register to delete a review on '" + vm.book.volumeInfo.title +"'";
            } else {
                if(review._user != vm.currentUser._id){
                    vm.reviewError = "You cannot delete other reader's review."
                } else{
                    vm.reviewError = false;
                    ReviewService
                        .deleteReview(review._id)
                        .success(function () {
                            init();
                        })
                        .error(function () {

                        });
                }
            }

        }
        
        function back() {
            if(title){
                $location.url("/search/title/"+title);
            } else if(author){
                $location.url("/search/author/"+author);
            } else if (genre){
                $location.url("/search/genre/"+genre);
            }
            
        }
    }
})();