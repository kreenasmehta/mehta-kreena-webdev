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
        
        function register(user) {
            var userExist = UserService.userExists(user.username);
            if (!userExist) {
                var passwordMatch = UserService.passwordMatches(
                    user.password, user.verifyPassword);
                if (!passwordMatch) {
                    vm.error = "The password do not match."

                } else {
                    user = UserService.createUser(user);
                    $location.url("/user/" + user._id);
                }
            } else {
                vm.error = "The given username already exists."
            }
        }
        
    }
})();
