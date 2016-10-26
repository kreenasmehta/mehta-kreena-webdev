/**
 * Created by kreenamehta on 10/17/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserByID: findUserByID,
            findUserByUserName: findUserByUserName,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function createUser(username, password) {
            var user ={
                username: username,
                password: password
            };
            return $http.post('/api/user', user);
        }

        /**
         * finds a user with the given credentials
         * returns null if none found
         * @param username
         * @param password
         * @returns {*}
         */
        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + '&password=' +password;
            return $http.get(url);
        }

        /**
         * finds a user with given userId
         * @param userId
         * @returns {*}
         */
        function findUserByID(userId) {
            var url = '/api/user/'+userId;
            return $http.get(url);
        }

        /**
         * finds a user with a given username
         * @param username
         * @returns {*}
         */
        function findUserByUserName(username) {
            var url = '/api/user?username=' + username;
            return $http.get(url);
        }

        /**
         * updates a given user
         * @param userId
         * @param user
         * @returns {*}
         */
        function updateUser(userId, user) {
            var url = '/api/user/'+userId;
            return $http.put(url, user);
        }

        /**
         * deletes a given user
         * @param userId
         */
        function deleteUser(userId) {
            var url = '/api/user/'+userId;
            return $http.delete(url);
        }
    }
})();
