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
                templateUrl: "views/home/main.view.client.html"
            })
            .when("/about", {
                templateUrl: "views/home/about.view.client.html"
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
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.client.html"
            })
            .when("/search/title", {
                templateUrl: "views/search/title.view.client.html"
            })
            .when("/search/title/:title", {
                templateUrl: "views/search/title.view.client.html"
            })
            .when("/search/author", {
                templateUrl: "views/search/author.view.client.html"
            })
            .when("/search/author/:author", {
                templateUrl: "views/search/author.view.client.html"
            })
            .when("/search/genre", {
                templateUrl: "views/search/genre.view.client.html"
            })
            .when("/search/genre/:genre", {
                templateUrl: "views/search/genre.view.client.html"
            })
            .when("/user/:uid/bookshelf", {
                templateUrl: "views/bookshelf/bookshelf.view.client.html"
            })
            .when("/book/:bid", {
                templateUrl: "views/book/book.view.client.html"
            })
            .otherwise({
                redirectTo: "/main"
            });
    }
})();