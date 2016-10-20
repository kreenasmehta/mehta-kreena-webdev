/**
 * Created by kreenamehta on 10/17/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;

        var user = UserService.findUserByID(userId);
        if(user != null){
            vm.user = user;
        }


    }
})();