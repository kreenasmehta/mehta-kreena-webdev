/**
 * Created by kreenamehta on 10/17/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var users =[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }

        ];

        var api = {
            createUser: createUser,
            findUserByID: findUserByID,
            findUserByUserName: findUserByUserName,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            userExists: userExists,
            passwordMatches: passwordMatches
        };

        return api;

        /**
         * returns a new userId (String)
         * @returns {string}
         */
        function getNewId(){
            var newId = parseInt(users[users.length - 1]._id) + 1;
            return newId.toString();
        }

        /**
         * creates a new user
         * @param user
         * @returns {*}
         */
        function createUser(user) {
            user._id = getNewId();
            users.push(user);
            return user;

        }

        /**
         * finds a user with the given credentials
         * returns null if none found
         * @param username
         * @param password
         * @returns {*}
         */
        function findUserByCredentials(username, password) {
            for(var u in users){
                user = users[u];
                if(user.username === username && user.password === password){
                    return user;
                }
            }
            return null;
        }

        /**
         * finds a user with given userId
         * @param userId
         * @returns {*}
         */
        function findUserByID(userId) {
            for(var u in users){
                user = users[u];
                if(user._id === userId){
                    return user;
                }
            }
            return null;
        }

        /**
         * finds a user with a given username
         * @param username
         * @returns {*}
         */
        function findUserByUserName(username) {
            for(var u in users){
                user = users[u];
                if(user.username === username){
                    return user;
                }
            }
            return null;
        }

        /**
         * updates a given user
         * @param userId
         * @param user
         * @returns {*}
         */
        function updateUser(userId, user) {
            for(i=0; i<users.length;i++){
                if(users[i]._id === userId){
                    users[i] = user;
                    return user;
                }
            }
            return null;
        }

        /**
         * deletes a given user
         * @param userId
         */
        function deleteUser(userId) {
            for(i=0; i<users.length;i++){
                if(users[i]._id === userId){
                    users.splice(i, 1);
                    break;
                }
            }
            
        }

        /**
         * returns true if a user with a given username exists, else false
         * @param username
         * @returns {boolean}
         */
        function userExists(username) {
            for(var u in users){
                user = users[u];
                if(user.username === username){
                    return true;
                }
            }
            return false;
        }

        /**
         * returns true if password and verifyPassword matches, else false
         * @param password
         * @param verifyPassword
         * @returns {boolean}
         */
        function passwordMatches(password, verifyPassword) {
            if(password === verifyPassword){
                return true;
            }
            return false;
        }
    }
})();
