/**
 * Created by kreenamehta on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController);
    
    function WebsiteListController($routeParams) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
    }
})();
