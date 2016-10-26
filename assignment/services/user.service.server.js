/**
 * Created by kreenamehta on 10/24/16.
 */
module.exports = function (app) {
    var users =[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }

    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);

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
     * finds an existing user by username or credentials
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
     * finds an existing user by username
     * returns '0' if not found
     * @param req
     * @param res
     */
    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users){
            if(users[u].username === username){
                var temp = users[u];
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * finds an existing user by credentials
     * returns '0' if not found
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
     * finds an existing user by userId
     * returns '0' if not found
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


};