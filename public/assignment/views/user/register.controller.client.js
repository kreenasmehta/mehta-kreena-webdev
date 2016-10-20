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
            if(userExist){
                vm.error = "The given username already exists."
            }else{
                user = UserService.createUser(user);
                $location.url("/user/" + user._id);
            }
        }
        
    }
})();
