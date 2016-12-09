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
            followReader: followReader,
            unfollowReader: unfollowReader
        };

        return api;

        /**
         * search readers by name
         * @param readerName
         * @returns {*}
         */
        function searchReadersByName(readerName) {
            var url = "/api/search/readers/"+readerName;
            return $http.get(url);
        }

        /**
         * follow a reader
         * @param user
         * @param readerUserId
         * @returns {*}
         */
        function followReader(user, readerUserId) {
            user.follows.push(readerUserId);
            var url = "/api/user/"+user._id;
            return $http.put(url, user);
        }

        /**
         * unfollow a reader
         * @param user
         * @param readerUserId
         * @returns {*}
         */
        function unfollowReader(user, readerUserId) {
            var readerUserIndex = user.follows.indexOf(readerUserId);
            user.follows.splice(readerUserIndex, 1);
            var url = "/api/user/"+user._id;
            return $http.put(url, user);
        }
    }
})();