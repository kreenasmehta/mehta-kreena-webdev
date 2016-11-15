/**
 * Created by kreenamehta on 11/15/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server.js')();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage
    };
    return api;
    
    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }
};