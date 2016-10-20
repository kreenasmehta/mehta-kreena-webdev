/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {

            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };

        return api;

        var website;
        function createWebsite(userId, website) {
            website._id = "910";
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId) {
            var resultWebsites = [];
            for (var w in websites) {
                website = websites[w];
                if (website.developerId === userId) {
                    resultWebsites.push(website);
                }
            }
            return resultWebsites;
            
        }
        
        function findWebsiteById(websiteId) {
            for(var w in websites){
                website = websites[w];
                if(website._id === websiteId){
                    return website;
                }
            }
            return null;
        }
        
        function updateWebsite(websiteId, website) {
            
        }
        
        function deleteWebsite(websiteId) {
            
        }

    }
})();
