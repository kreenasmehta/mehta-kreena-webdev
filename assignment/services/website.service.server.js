/**
 * Created by kreenamehta on 10/26/16.
 */
module.exports = function (app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem Facebook" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem Tweeter" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem Gizmodo" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem Tic Tac Toe" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem Checkers" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem Chess" }
    ];

    app.get('/api/user/:uid/website', findAllWebsitesForUser);


    /**
     * finds websites for a given user
     * @param req
     * @param res
     */
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        var resultWebsites = [];
        for(var w in websites){
            if(websites[w].developerId === userId){
                resultWebsites.push(websites[w]);
            }
        }
        res.send(resultWebsites);
    }
};