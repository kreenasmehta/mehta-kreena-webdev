/**
 * Created by kreenamehta on 12/11/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("UserListController", UserListController);

    function UserListController(UserService, $location) {
        var vm = this;
        vm.viewUserProfile = viewUserProfile;

        function init() {
            UserService
                .checkLogin()
                .success(function (user) {
                    if(user != '0'){
                        vm.loggedIn = true;
                        vm.currentUser = user;
                    } else{
                        vm.loggedIn = false;
                    }
                })
                .error(function (error) {

                });
            UserService
                .getAllUsers()
                .success(function (users) {
                    vm.users = users;
                })
                .error(function (error) {
                    
                });
        }
        init();

        /**
         * view user profile
         * @param userId
         */
        function viewUserProfile(userId) {
            $location.url('/user/'+vm.currentUser._id +'/profile/' + userId + "/admin/" + vm.currentUser._id);
        }
    }
})();