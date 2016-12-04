/**
 * Created by kreenamehta on 12/3/16.
 */
(function () {
    angular
        .module("BooksApp")
        .factory("ReaderService", ReaderService);

    function ReaderService($http) {

        var api = {
            searchReadersByName: searchReadersByName,
            followReader: followReader
        };

        return api;

        function searchReadersByName(readerName) {
            var url = "/api/search/readers/"+readerName;
            return $http.get(url);
        }

        function followReader(user, readerUserId) {
            user.follows.push(readerUserId);
            var url = "/api/user/"+user._id;
            return $http.put(url, user)
        }
    }
})();