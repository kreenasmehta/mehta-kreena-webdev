/**
 * Created by kreenamehta on 11/23/16.
 */
module.exports = function (app) {

    var users =[
      {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com", loggedIn: false, bookshelfID: "1111"},
      {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com", loggedIn: false, bookshelfID: "2222"},
      {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com", loggedIn: false, bookshelfID: "3333"},
      {_id: "456", username: "kreena", password: "kreena", firstName: "Kreena",   lastName: "Mehta", email: "kreena@mehta.com", loggedIn: false, bookshelfID: "4444"}
    ];

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
        user._id = (new Date()).getTime().toString();
        users.push(user);
        res.send(user);
    }

    /**
     *  finds a user
     * @param req
     * @param res
     */
    function findUser(req, res) {
        var params = req.params;
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
        for(var u in users){
            if(users[u].username === username){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * finds a user by credentials
     * @param req
     * @param res
     */
    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users){
            if(users[u].username === username &&
                users[u].password === password){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * finds a user by user id
     * @param req
     * @param res
     */
    function findUserById(req, res) {
        var userId = req.params.uid;
        for(var u in users){
            if(users[u]._id === userId){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * updates a user
     * @param req
     * @param res
     */
    function updateUser(req, res) {
        var userId = req.params.uid;
        var user = req.body;
        for(var u in users){
            if(users[u]._id === userId){
                users[u] = user;
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * deletes a user
     * @param req
     * @param res
     */
    function deleteUser(req, res) {
        var userId = req.params.uid;
        for(var u in users){
            if(users[u]._id === userId){
                users.splice(u, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }


};