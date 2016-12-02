/**
 * Created by kreenamehta on 11/23/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        /**
         * Registers a new user if the password and the verifyPassword match AND
         * if the give username does not already exist AND
         * if the username is not "", null or undefined.
         * Else, throws an appropriate error message.
         * @param user
         */
        function register(user) {
            var password = user.password;
            var verifyPassword = user.verifypassword;
            if(password != verifyPassword){
                vm.error = "The passwords do not match.";
            } else {
                if (user.username === "" || user.username === null || user.username === undefined) {
                    vm.error = "username is require to register.";
                } else{
                    UserService
                        .findUserByUserName(user.username)
                        .success(function (existingUser) {
                            if(existingUser === '0'){
                                UserService
                                    // .createUser(user)
                                    .register(user)
                                    .success(function (newUser) {
                                        $location.url("/user/" + newUser._id);
                                    })
                                    .error(function (error) {
                                        console.log(error);
                                    });
                            }else{
                                vm.error = "The given username already exists.";
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                        });
                }

            }

        }

    }
})();