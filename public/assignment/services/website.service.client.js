/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

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

        function getNewId(){
            var newId = parseInt(websites[websites.length - 1]._id) + 1;
            return newId.toString();
        }

        var website;
        function createWebsite(userId, website) {
            website._id = getNewId();
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
            for(i=0;i<websites.length;i++){
                if(websites[i]._id === websiteId){
                    websites[i] = website;
                    return website;
                }
            }
            return null;
        }
        
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
