/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);
    
    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (error) {

                });

            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    if(page != '0'){
                        vm.page = page;
                    }
                })
                .error(function (error) {

                });
        }
        init();

        /**
         * updates a given page
         * @param page
         */
        function updatePage(page) {
            if(page.name === undefined || page.name.length < 1){
                vm.error = "Page name cannot be empty.";
            } else{
                PageService
                    .updatePage(vm.pageId, page)
                    .success(function (page) {
                        if(page != '0'){
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                        }
                    })
                    .error(function (error) {

                    });

            }

        }

        /**
         * deletes a page
         */
        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }


    }
})();
