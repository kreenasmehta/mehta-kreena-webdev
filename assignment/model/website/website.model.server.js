/**
 * Created by kreenamehta on 11/14/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server.js')();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById
    };
    return api;
    
    function createWebsite(userId, website) {
        website._user = userId;
        return WebsiteModel.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find(
            {
                _user: userId
            }
        );
    }
    
    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }
};
