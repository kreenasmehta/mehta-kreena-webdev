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

        /**
         * returns a new pageID (String)
         * @returns {string}
         */
        function getNewId(){
            var newId = parseInt(pages[pages.length - 1]._id) + 1;
            return newId.toString();
        }

        var page;

        /**
         * creates a new page
         * @param websiteId
         * @param page
         * @returns {*}
         */
        function createPage(websiteId, page) {
            page._id = getNewId();
            page.websiteId = websiteId;
            pages.push(page);
            return page;
            
        }

        /**
         * finds pages by websiteId
         * @param websiteId
         * @returns {Array}
         */
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

        /**
         * finds page by pageId
         * @param pageId
         * @returns {*}
         */
        function findPageById(pageId) {
            for(var p in pages){
                page = pages[p];
                if(page._id === pageId){
                    return page;
                }
            }
            return null;
            
        }

        /**
         * updates a the given page
         * @param pageId
         * @param page
         * @returns {*}
         */
        function updatePage(pageId, page) {
            for(i=0;i<pages.length;i++){
                if(pages[i]._id === pageId){
                    pages[i] = page;
                    return page;
                }
            }
            return null;
            
        }

        /**
         * deletes a given page
         * @param pageId
         */
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

