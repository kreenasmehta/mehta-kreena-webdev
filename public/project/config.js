/**
 * Created by kreenamehta on 11/22/16.
 */
(function () {
    angular
        .module("BooksApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "views/home/main.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/about", {
                templateUrl: "views/home/about.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    checkLogin: checkLogin
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/search/title", {
                templateUrl: "views/search/title.view.client.html",
                controller: "TitleSearchController",
                controllerAs: "model"
            })
            .when("/search/title/:title", {
                templateUrl: "views/search/title.view.client.html",
                controller: "TitleSearchController",
                controllerAs: "model"
            })
            .when("/search/author", {
                templateUrl: "views/search/author.view.client.html",
                controller: "AuthorSearchController",
                controllerAs: "model"
            })
            .when("/search/author/:author", {
                templateUrl: "views/search/author.view.client.html",
                controller: "AuthorSearchController",
                controllerAs: "model"
            })
            .when("/search/genre", {
                templateUrl: "views/search/genre.view.client.html",
                controller: "GenreSearchController",
                controllerAs: "model"
            })
            .when("/search/genre/:genre", {
                templateUrl: "views/search/genre.view.client.html",
                controller: "GenreSearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/bookshelf", {
                templateUrl: "views/bookshelf/bookshelf.view.client.html",
                controller: "BookshelfController",
                controllerAs: "model"
            })
            .when("/book/:bid", {
                templateUrl: "views/book/book.view.client.html",
                controller: "BookDetailsController",
                controllerAs: "model"
            })
            .when("/book/:bid/title/:title", {
                templateUrl: "views/book/book.view.client.html",
                controller: "BookDetailsController",
                controllerAs: "model"
            })
            .when("/book/:bid/author/:author", {
                templateUrl: "views/book/book.view.client.html",
                controller: "BookDetailsController",
                controllerAs: "model"
            })
            .when("/book/:bid/genre/:genre", {
                templateUrl: "views/book/book.view.client.html",
                controller: "BookDetailsController",
                controllerAs: "model"
            })
            .when("/book/:bid/user/:uid", {
                templateUrl: "views/book/book.view.client.html",
                controller: "BookDetailsController",
                controllerAs: "model"
            })
            .when("/search/readers", {
                templateUrl: "views/search/readers.view.client.html",
                controller: "ReaderSearchController",
                controllerAs: "model"
            })
            .when("/search/readers/:readerName", {
                templateUrl: "views/search/readers.view.client.html",
                controller: "ReaderSearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/profile/:pid", {
                templateUrl: "views/user/readerProfile.view.client.html",
                controller: "ReaderProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/profile/:pid/search/:readerName", {
                templateUrl: "views/user/readerProfile.view.client.html",
                controller: "ReaderProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/profile/:pid/admin/:adminId", {
                templateUrl: "views/user/readerProfile.view.client.html",
                controller: "ReaderProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/follows", {
                templateUrl: "views/user/followingReaders.view.client.html",
                controller: "FollowingReadersController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/user-list.view.client.html",
                controller: "UserListController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .otherwise({
                redirectTo: "/main"
            });

        /**
         * check login
         * @param $q
         * @param UserService
         * @returns {promise.promise|jQuery.promise|d.promise|promise|*}
         */
        function checkLogin($q, UserService) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if(user != '0'){
                            deferred.resolve();
                        } else{
                            deferred.reject();
                        }
                    }
                );
            return deferred.promise;
        }

        /**
         * check admin
         * @param $q
         * @param UserService
         * @returns {jQuery.promise|promise.promise|d.promise|*|promise}
         */
        function checkAdmin($q, UserService) {
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(
                    function (user) {
                        if(user != '0'){
                            deferred.resolve();
                        } else{
                            deferred.reject();
                        }
                    }
                );
            return deferred.promise;
        }
    }
})();