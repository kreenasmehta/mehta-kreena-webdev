/**
 * Created by kreenamehta on 11/15/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server.js')();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById
    };
    return api;
    
    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }
    
    function findAllPagesForWebsite(websiteId) {
        return PageModel.find(
            {
                _website: websiteId
            }
        );
    }
    
    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }
};