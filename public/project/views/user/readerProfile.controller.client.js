/**
 * Created by kreenamehta on 12/3/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("ReaderProfileController", ReaderProfileController);

    function ReaderProfileController(UserService, $routeParams, ReaderService, $location, BookshelfService) {
        var vm = this;
        vm.readerProfileId = $routeParams['pid'];
        vm.followReader = followReader;
        vm.showFollowingReaders = showFollowingReaders;

        /**
         * check login, find the reader profile, find the reader bookshelf on loading the page
         */
        function init() {
            UserService
                .checkLogin()
                .success(function (user) {
                    if(user != '0'){
                        vm.loggedIn = true;
                        vm.currentUser = user;
                    } else{
                        vm.loggedIn = false;
                        $location.url('/main');
                    }
                })
                .error(function (error) {

                });
            UserService
                .findUserByID(vm.readerProfileId)
                .success(function (readerProfile) {
                    vm.readerProfile = readerProfile;
                    vm.readerProfile.dob = readerProfile.dob.split("T")[0];
                    if(vm.readerProfile._id == vm.currentUser._id){
                        vm.canFollow = false;
                    } else {
                        vm.canFollow = true;
                    }
                })
                .error(function (error) {

                });
            BookshelfService
                .getBookshelfForUser(vm.readerProfileId)
                .success(function (readerBookshelf) {
                    vm.readerBookshelf = readerBookshelf;
                })
                .error(function (error) {

                });
        }

        init();

        /**
         * follow a reader if the current user is not already following the reader. Else, throw an
         * appropriate message.
         */
        function followReader() {
            var readerInFollows = false;
            var currentUserFollows = vm.currentUser.follows;
            for(x in currentUserFollows){
                if(vm.readerProfileId == currentUserFollows[x]){
                    readerInFollows = true;
                    break;
                }
            }
            if(!readerInFollows){
                ReaderService
                    .followReader(vm.currentUser, vm.readerProfileId)
                    .success(function (user) {
                        vm.success = "You are now following " + vm.readerProfile.firstName +" "+
                            vm.readerProfile.lastName + "."
                    })
                    .error(function (error) {

                    });
            } else{
                vm.info="You are already following " + vm.readerProfile.firstName +" "+
                    vm.readerProfile.lastName+".";
            }
        }

        function showFollowingReaders() {
            $location.url("/user/"+vm.currentUser._id+"/follows");
        }
    }
})();