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
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.client.html"
            })
            .when("/title", {
                templateUrl: "views/search/title.view.client.html"
            })
            .when("/author", {
                templateUrl: "views/search/author.view.client.html"
            })
            .when("/genre", {
                templateUrl: "views/search/genre.view.client.html"
            })
            .when("/bookshelf", {
                templateUrl: "views/bookshelf/bookshelf.view.client.html"
            })
            .when("/book", {
                templateUrl: "views/book/book.view.client.html"
            })
            .otherwise({
                redirectTo: "/main"
            });
    }
})();