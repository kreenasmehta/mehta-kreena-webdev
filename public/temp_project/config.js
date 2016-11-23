/**
 * Created by kreenamehta on 11/17/16.
 */
(function () {
    angular
        .module("BooksApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "views/user/main.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .otherwise({
                redirectTo: "/main"
            });
    }
})();