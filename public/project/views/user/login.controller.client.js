/**
 * Created by kreenamehta on 11/23/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        /**
         * validates and logs in the user
         * @param username
         * @param password
         */
        function login(username, password) {
            UserService
                // .findUserByCredentials(username, password)
                .login(username, password)
                .success(function (user) {
                    if(user === '0'){
                        vm.error = "No such user."
                    } else{
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (error) {
                    console.log(error);
                });
        }

    }
})();