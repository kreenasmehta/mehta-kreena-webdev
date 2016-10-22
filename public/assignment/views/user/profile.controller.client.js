/**
 * Created by kreenamehta on 10/17/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams,$location, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.updateProfile= updateProfile;

        function init() {
            var user = UserService.findUserByID(userId);
            if(user != null){
                vm.user = user;
            }
        }

        /**
         * updates the user profile
         * @param user
         */
        function updateProfile(user) {
            user = UserService.updateUser(user._id, user);
            $location.url("/user/" + user._id);
        }

        init();

    }
})();