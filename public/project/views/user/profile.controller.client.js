/**
 * Created by kreenamehta on 11/23/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.updateProfile = updateProfile;
        vm.openBookshelf = openBookshelf;
        vm.deleteProfile = deleteProfile;

        function init() {
            UserService
                .findUserByID(userId)
                .success(function (user) {
                    if(user != '0'){
                        vm.user = user;
                    }
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();

        /**
         * updates the user profile
         * @param user
         */
        function updateProfile(user) {
            UserService
                .updateUser(user._id, user)
                .success(function (user) {
                    if(user != '0'){
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (error) {

                });

        }


        /**
         * opens the current user's bookshelf
         */
        function openBookshelf() {
            $location.url("/user/"+userId+"/bookshelf");
        }

        /**
         * deletes the current user's profile
         */
        function deleteProfile() {
            UserService
                .deleteUser(userId)
                .success(function () {
                    $location.url("/login");
                })
                .error(function (error) {

                });
        }
    }
})();