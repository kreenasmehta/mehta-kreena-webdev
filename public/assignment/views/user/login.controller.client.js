(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login= login;

        /**
         * checks the user credentials, if valid then logs in
         * @param username
         * @param password
         */
        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user === null){
                vm.error = "No such user."
            } else{
                $location.url("/user/" + user._id);
            }
        }
    }
})();