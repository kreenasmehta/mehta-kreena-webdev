/**
 * Created by kreenamehta on 11/23/16.
 */
module.exports = function (app, model) {

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    /**
     * creates a new user
     * @param req
     * @param res
     */
    function createUser(req, res) {
        var user = req.body;
        model.userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     *  finds a user
     * @param req
     * @param res
     */
    function findUser(req, res) {
        var query = req.query;
        if(query.password && query.username){
            findUserByCredentials(req, res);
        } else if(query.username){
            findUserByUsername(req, res);
        }
    }


    /**
     * finds a user by username
     * @param req
     * @param res
     */
    function findUserByUsername(req, res) {
        var username = req.query.username;
        model.userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.send(user);
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
     * finds a user by credentials
     * @param req
     * @param res
     */
    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model.userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user){
                        res.send(user);
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
     * finds a user by user id
     * @param req
     * @param res
     */
    function findUserById(req, res) {
        var userId = req.params.uid;
        model.userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user){
                        res.send(user);
                    } else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * updates a user
     * @param req
     * @param res
     */
    function updateUser(req, res) {
        var userId = req.params.uid;
        var user = req.body;
        model.userModel
            .updateUser(userId, user)
            .then(
                function (status) {
                    res.send(user);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * deletes a user
     * @param req
     * @param res
     */
    function deleteUser(req, res) {
        var userId = req.params.uid;
        model.userModel
            .deleteUser(userId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }


};