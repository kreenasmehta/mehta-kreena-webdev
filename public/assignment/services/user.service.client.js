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
            deleteUser: deleteUser
        };

        return api;

        function createUser(user) {
            user._id = "567";
            users.push(user);
            return user;

        }

        function findUserByCredentials(username, password) {
            for(var u in users){
                user = users[u];
                if(user.username === username && user.password === password){
                    return user;
                }
            }
            return null;
        }

        function findUserByID(userId) {
            for(var u in users){
                user = users[u];
                if(user._id === userId){
                    return user;
                }
            }
            return null;
        }

        function findUserByUserName(username) {
            for(var u in users){
                user = users[u];
                if(user.username === username){
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, username) {

        }

        function deleteUser(userId) {

        }

        function userExists(username) {
            for(var u in users){
                user = users[u];
                if(user.username === username){
                    return true;
                }
            }
            return false;
        }
    }
})();
