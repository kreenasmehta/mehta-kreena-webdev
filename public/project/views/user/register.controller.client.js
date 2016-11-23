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

        function register(user) {
            var password = user.password;
            var verifyPassword = user.verifypassword;
            if(password != verifyPassword){
                vm.error = "The passwords do not match";
            } else{
                var existingUser = UserService.findUserByUserName(user.username);
                if(existingUser == null){
                    var newUser = UserService.createUser(user);
                    $location.url("/profile");
                } else{
                    vm.error = "The given user already exists."
                }
            }

        }
    }
})();