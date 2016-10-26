/**
 * Created by kreenamehta on 10/26/16.
 */
module.exports = function (app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);


    /**
     * creates a new page for the given website
     * @param req
     * @param res
     */
    function createPage(req, res) {
        var websiteId = req.params.wid;
        var page = req.body;
        page._id = (new Date()).getTime().toString();
        page.websiteId = websiteId;
        pages.push(page);
        res.send(page);
    }

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

    /**
     * finds a page by pageId
     * @param req
     * @param res
     */
    function findPageById(req, res) {
        var pageId = req.params.pid;
        for(var p in pages){
            if(pages[p]._id === pageId){
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * updates a given page
     * @param req
     * @param res
     */
    function updatePage(req, res) {
        var pageId = req.params.pid;
        var page = req.body;
        for(var p in pages){
            if(pages[p]._id === pageId){
                pages[p] = page;
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * deletes the given page
     * @param req
     * @param res
     */
    function deletePage(req, res) {
        var pageId = req.params.pid;
        for(var p in pages){
            if(pages[p]._id === pageId){
                pages.splice(p, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

};