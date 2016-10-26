/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
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
            var url = '/api/website/'+websiteId+'/page';
            return $http.post(url, page);
        }

        /**
         * finds pages by websiteId
         * @param websiteId
         * @returns {Array}
         */
        function findPageByWebsiteId(websiteId) {
            var url = '/api/website/'+websiteId+'/page';
            return $http.get(url);
        }

        /**
         * finds page by pageId
         * @param pageId
         * @returns {*}
         */
        function findPageById(pageId) {
            var url = '/api/page/'+pageId;
            return $http.get(url);
        }

        /**
         * updates a the given page
         * @param pageId
         * @param page
         * @returns {*}
         */
        function updatePage(pageId, page) {
            var url = '/api/page/'+pageId;
            return $http.put(url, page);
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

