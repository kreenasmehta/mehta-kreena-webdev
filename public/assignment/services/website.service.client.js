/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem Facebook" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem Tweeter" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem Gizmodo" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem Tic Tac Toe" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem Checkers" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem Chess" }
        ];

        var api = {

            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };

        return api;

        /**
         * returns a new websiteId
         * @returns {string}
         */
        function getNewId(){
            var newId = parseInt(websites[websites.length - 1]._id) + 1;
            return newId.toString();
        }

        var website;

        /**
         * creates a new website
         * @param userId
         * @param website
         * @returns {*}
         */
        function createWebsite(userId, website) {
            var url = '/api/user/'+userId+'/website';
            return $http.post(url, website);
        }

        /**
         * finds websites for a given user
         * @param userId
         * @returns {Array}
         */
        function findWebsitesByUser(userId) {
            var url = '/api/user/'+userId+'/website';
            return $http.get(url);
        }

        /**
         * finds a website by given websiteId, returns null if not found
         * @param websiteId
         * @returns {*}
         */
        function findWebsiteById(websiteId) {
            var url = '/api/website/'+websiteId;
            return $http.get(url);
        }

        /**
         * updates a given website
         * @param websiteId
         * @param website
         * @returns {*}
         */
        function updateWebsite(websiteId, website) {
            var url = '/api/website/'+websiteId;
            return $http.put(url, website);
        }

        /**
         * deletes a given website
         * @param websiteId
         */
        function deleteWebsite(websiteId) {
            for(i=0;i<websites.length;i++){
                if(websites[i]._id === websiteId){
                    websites.splice(i,1);
                    break;
                }
            }
        }
    }
})();
