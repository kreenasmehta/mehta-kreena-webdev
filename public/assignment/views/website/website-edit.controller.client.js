/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);
    
    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
                .error(function () {

                });

            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (error) {

                });
        }
        init();

        /**
         * updates the given website
         * @param website
         */
        function updateWebsite(website) {
            if(website.name === undefined || website.name.length < 1){
                vm.error = "Website name cannot be empty.";
            } else{
                website = WebsiteService.updateWebsite(vm.websiteId, website);
                $location.url("/user/"+vm.userId+"/website");
            }

        }

        /**
         * deletes a website
         */
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");

        }


    }
})();
