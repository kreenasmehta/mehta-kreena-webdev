/**
 * Created by kreenamehta on 11/23/16.
 */
module.exports = function (app, model) {


    var passport      = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');
    var bcrypt = require("bcrypt-nodejs");
    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/api/admin/user',findAllUsers);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get('/api/user/:uid/follows', getFollowsOfUser);
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#/user/',
            failureRedirect: '/#/login'
        }));

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    /**
     * facebook strategy to login with Facebook credentials
     * @param token
     * @param refreshToken
     * @param profile
     * @param done
     */
    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var nameParts = profile.displayName.split(" ");
                        var newFacebookUser = {
                            username:  nameParts[0]+nameParts[1],
                            firstName: nameParts[0],
                            lastName:  nameParts[1],
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    /**
     * serialize user
     * @param user
     * @param done
     */
    function serializeUser(user, done) {
        done(null, user);
    }

    /**
     * deserialize user
     * @param user
     * @param done
     */
    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    /**
     * local strategy
     * @param username
     * @param password
     * @param done
     */
    function localStrategy(username, password, done) {
        model.userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * find all the users
     * @param req
     * @param res
     */
    function findAllUsers(req, res) {
        model.userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }


    /**
     * login
     * @param req
     * @param res
     */
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    /**
     * check login
     * @param req
     * @param res
     */
    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    /**
     * check admin
     * @param req
     * @param res
     */
    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if(loggedIn && isAdmin){
            res.json(req.user);
        } else{
            res.send('0');
        }
    }

    /**
     * logout
     * @param req
     * @param res
     */
    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    /**
     * register a user
     * @param req
     * @param res
     */
    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

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
        }else{
            res.json(req.user);
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
        user.password = bcrypt.hashSync(user.password);
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

    /**
     * get the users that the current user is following
     * @param req
     * @param res
     */
    function getFollowsOfUser(req, res) {
        var userId = req.params.uid;

        model.userModel.findUserByIdExtended(userId)
            .then(
                function (user) {
                res.json(user);
            },
                function(err){
                console.log(err);
            });

    }


};