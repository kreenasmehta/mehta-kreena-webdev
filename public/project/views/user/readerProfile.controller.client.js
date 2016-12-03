/**
 * Created by kreenamehta on 12/3/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("ReaderProfileController", ReaderProfileController);

    function ReaderProfileController(UserService, $routeParams) {
        var vm = this;
        vm.readerProfileId = $routeParams['pid'];

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
                })
                .error(function (error) {

                });
        }

        init();
    }
})();