/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById:findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function getNewId(){
            return parseInt(pages[pages.length - 1]._id) + 1;
        }

        var page;
        function createPage(websiteId, page) {
            page._id = getNewId();
            page.websiteId = websiteId;
            pages.push(page);
            return page;
            
        }
        
        function findPageByWebsiteId(websiteId) {
            var resultPages = [];
            for(var p in pages){
                page = pages[p];
                if(page.websiteId === websiteId){
                    resultPages.push(page);
                }
            }
            return resultPages;
            
        }

        function findPageById(pageId) {
            for(var p in pages){
                page = pages[p];
                if(page._id === pageId){
                    return page;
                }
            }
            return null;
            
        }
        
        function updatePage(pageId, page) {
            for(i=0;i<pages.length;i++){
                if(pages[i]._id === pageId){
                    pages[i] = page;
                    return page;
                }
            }
            return null;
            
        }
        
        function deletePage(pageId) {
            for(i=0;i<pages.length;i++){
                if(pages[i]._id === pageId){
                    pages.splice(i,1);
                    break;
                }
            }
            
        }
    }
})();

