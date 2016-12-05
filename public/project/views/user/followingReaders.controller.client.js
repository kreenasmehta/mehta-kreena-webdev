/**
 * Created by kreenamehta on 12/3/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("FollowingReadersController", FollowingReadersController);

    function FollowingReadersController(UserService, $location) {
        var vm = this;
        vm.viewReaderProfile = viewReaderProfile;

        /**
         * check login on loading the page
         */
        function init() {
            UserService
                .checkLogin()
                .success(function (user) {
                    if(user != '0'){
                        vm.loggedIn = true;
                        vm.currentUser = user;
                        UserService
                            .getFollowsOfUser(user._id)
                            .success(function (extendedUser) {
                                vm.follows = extendedUser.follows;
                            })
                            .error(function () {
                                
                            });
                        
                    } else{
                        vm.loggedIn = false;
                        $location.url('/main');
                    }
                })
                .error(function (error) {

                });
        }
        init();

        function viewReaderProfile(readerUserId) {
            $location.url('/user/'+vm.currentUser._id +'/profile/' + readerUserId);
        }
    }
})();