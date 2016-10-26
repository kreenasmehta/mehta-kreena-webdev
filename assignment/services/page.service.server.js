/**
 * Created by kreenamehta on 10/26/16.
 */
module.exports = function (app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.get('/api/website/:wid/page', findAllPagesForWebsite);

    /**
     * finds all pages for a given websiteId
     * @param req
     * @param res
     */
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        var resultPages = [];
        for(var p in pages){
            if(pages[p].websiteId === websiteId){
                resultPages.push(pages[p]);
            }
        }
        res.send(resultPages);
    }

};