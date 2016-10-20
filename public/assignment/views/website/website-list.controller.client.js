/**
 * Created by kreenamehta on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.websites = WebsiteService.findWebsitesByUser(userId);

        var user = UserService.findUserByID(userId);
        if(user != null){
            vm.user = user;
        }

    }
})();
