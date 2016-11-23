/**
 * Created by kreenamehta on 11/22/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("ProfileController", ProfileController);

    function ProfileController() {
        var vm = this;
        vm.username = "Hello World";
    }
})();