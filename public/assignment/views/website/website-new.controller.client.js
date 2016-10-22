/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();


        /**
         * creates a new website
         * @param website
         */
        function createWebsite(website) {
            if(website === undefined || website.name === undefined){
                vm.error = "Name is required to create a new website";
            }else{
                website = WebsiteService.createWebsite(vm.userId, website);
                $location.url("/user/" + vm.userId + "/website");
            }

        }
    }
})();
