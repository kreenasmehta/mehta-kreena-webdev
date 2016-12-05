/**
 * Created by kreenamehta on 12/3/16.
 */
(function () {
    angular
        .module("BooksApp")
        .controller("ReaderSearchController", ReaderSearchController);

    function ReaderSearchController(UserService, $location, ReaderService, $routeParams) {
        var vm = this;
        vm.searchReadersByName = searchReadersByName;
        vm.viewReaderProfile = viewReaderProfile;
        var readerName = $routeParams['readerName'];

        function init() {
            if(readerName){
                vm.readerName=readerName;
                $location.url("/search/readers/"+readerName);
                searchReadersByName(readerName)
            }
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
        }
        init();

        function searchReadersByName(readerName) {
            $location.url("/search/readers/"+readerName);
            ReaderService
                .searchReadersByName(readerName)
                .success(function (readers) {
                    vm.readers = readers;
                })
                .error(function (error) {

                });
        }

        function viewReaderProfile(readerUserId) {
            $location.url('/user/'+vm.currentUser._id +'/profile/' + readerUserId + "/search/" + readerName);
        }
    }

})();