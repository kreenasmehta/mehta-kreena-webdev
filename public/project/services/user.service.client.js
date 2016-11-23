/**
 * Created by kreenamehta on 11/23/16.
 */
(function () {
    angular
        .module("BooksApp")
        .factory("UserService", UserService);

    function UserService() {

        var users =[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com", loggedIn: false, bookshelfID: "1111"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com", loggedIn: false, bookshelfID: "2222"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com", loggedIn: false, bookshelfID: "3333"},
            {_id: "456", username: "kreena", password: "kreena", firstName: "Kreena",   lastName: "Mehta", email: "kreena@mehta.com", loggedIn: false, bookshelfID: "4444"}
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
            user.loggedIn = true;
            users.push(user);
            return user;
        }

        function findUserByID() {

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

        function findUserByCredentials() {

        }

        function updateUser() {

        }

        function deleteUser() {

        }
    }
})();