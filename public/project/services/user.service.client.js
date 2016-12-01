/**
 * Created by kreenamehta on 11/23/16.
 */
(function () {
    angular
        .module("BooksApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {

            createUser: createUser,
            findUserByID: findUserByID,
            findUserByUserName: findUserByUserName,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLogin: checkLogin,
            logout: logout

        };

        return api;

        /**
         * creates a new user
         * @param user
         * @returns {*}
         */
        function createUser(user) {
            return $http.post('/api/user', user);
        }

        /**
         * finds user by id
         * @param userId
         * @returns {*}
         */
        function findUserByID(userId) {
            var url = '/api/user/'+userId;
            return $http.get(url);
        }

        /**
         * finds user by username
         * @param username
         * @returns {*}
         */
        function findUserByUserName(username) {
            var url = '/api/user?username=' + username;
            return $http.get(url);
        }

        /**
         * finds user by credentials
         * @param username
         * @param password
         * @returns {*}
         */
        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + '&password=' +password;
            return $http.get(url);
        }


        /**
         * updates the user
         * @param userId
         * @param user
         * @returns {*}
         */
        function updateUser(userId, user) {
            var url = '/api/user/'+userId;
            return $http.put(url, user);
        }

        /**
         * deletes the user
         * @param userId
         * @returns {*}
         */
        function deleteUser(userId) {
            var url = '/api/user/'+userId;
            return $http.delete(url);
        }

        /**
         * login
         * @param username
         * @param password
         * @returns {*}
         */
        function login(username, password) {
            var user ={
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        /**
         * check login
         * @returns {*}
         */
        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        /**
         * logout
         * @returns {*}
         */
        function logout() {
            return $http.post("/api/logout");
        }


    }
})();