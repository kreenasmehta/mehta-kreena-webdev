/**
 * Created by kreenamehta on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.userId = userId;
        vm.websites = WebsiteService.findWebsitesByUser(userId);

    }
})();
