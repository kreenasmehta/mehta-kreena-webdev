/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;


        /**
         * creates a new user
         * @param username
         * @param password
         * @param verifyPassword
         */
        function register(username, password, verifyPassword) {
            if(password != verifyPassword){
                vm.error = "The passwords do not match";
            } else {
                UserService
                    .createUser(username, password)
                    .success(function (user) {
                        $location.url("/user/" + user._id);
                    })
                    .error(function (error) {
                        console.log(error);
                    });

            }

        }
        
    }
})();
