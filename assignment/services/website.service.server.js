/**
 * Created by kreenamehta on 10/26/16.
 */
module.exports = function (app, model) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem Facebook" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem Tweeter" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem Gizmodo" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem Tic Tac Toe" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem Checkers" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem Chess" }
    ];

    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);


    /**
     * creates a new website for a given user
     * @param req
     * @param res
     */
    function createWebsite(req, res) {
        var userId = req.params.uid;
        var website = req.body;
        //create website
            // find user by ID
                // add website to the website array of user
        model.websiteModel
            .createWebsite(userId, website)
            .then(
                function (website) {
                    model.userModel
                        .findUserById(userId)
                        .then(
                            function (user) {
                                model.userModel
                                    .updateUserWebsite(user, website)
                                    .then(
                                        function (status) {
                                            res.send(website);
                                        },
                                        function (error) {
                                            res.sendStatus(400).message(error);
                                        }
                                    );
                            },
                            function (error) {
                                res.sendStatus(400).message(error);
                            }
                        );
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds websites for a given user
     * @param req
     * @param res
     */
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        model.websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.send(websites);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds a website by the given websiteId
     * @param req
     * @param res
     */
    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        model.websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    if(website){
                        res.send(website)
                    }else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * updates a given website
     * @param req
     * @param res
     */
    function updateWebsite(req, res) {
        var websiteId = req.params.wid;
        var website = req.body;
        for(var w in websites){
            if(websites[w]._id === websiteId){
                websites[w] = website;
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * deletes the current website
     * @param req
     * @param res
     */
    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        for(var w in websites){
            if(websites[w]._id === websiteId){
                websites.splice(w, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
};