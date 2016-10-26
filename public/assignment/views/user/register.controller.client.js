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
         * registers a new user if the given username is not already present in the database,
         * and the password and verifyPassword match
         * otherwise returns an appropriate error message
         * @param user
         */
        // function register(user) {
        //     var userExist = UserService.userExists(user.username);
        //     if (!userExist) {
        //         var passwordMatch = UserService.passwordMatches(
        //             user.password, user.verifyPassword);
        //         if (!passwordMatch) {
        //             vm.error = "The password do not match."
        //
        //         } else {
        //             user = UserService.createUser(user);
        //             $location.url("/user/" + user._id);
        //         }
        //     } else {
        //         vm.error = "The given username already exists."
        //     }
        // }

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
