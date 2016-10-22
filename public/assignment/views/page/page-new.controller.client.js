/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        /**
         * creates a new page
         * @param page
         */
        function createPage(page) {
            if(page === undefined || page.name === undefined){
                vm.error = "Name is required to create a new page";
            }else{
                page = PageService.createPage(vm.websiteId, page);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page")
            }
        }
    }
})();
