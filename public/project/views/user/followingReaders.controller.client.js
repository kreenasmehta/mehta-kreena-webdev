/**
 * Created by kreenamehta on 12/3/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("FollowingReadersController", FollowingReadersController);

    function FollowingReadersController(UserService, $location, ReaderService) {
        var vm = this;
        vm.viewReaderProfile = viewReaderProfile;
        vm.unfollowReader = unfollowReader;

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
                                if(extendedUser.follows.length==0){
                                    vm.noFollows = "You are not following any readers yet.";
                                } else{
                                    vm.noFollows= false;
                                    vm.follows = extendedUser.follows;
                                }
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

        function unfollowReader(followsId) {
            ReaderService
                .unfollowReader(vm.currentUser, followsId)
                .success(function () {
                    init();
                })
                .error(function () {

                });
        }
    }
})();