/**
 * Created by kreenamehta on 12/3/16.
 */
(function () {
    angular
        .module("BooksApp")
        .factory("ReaderService", ReaderService);

    function ReaderService($http) {

        var api = {
            searchReadersByName: searchReadersByName
        };

        return api;

        function searchReadersByName(readerName) {
            var url = "/api/search/readers/"+readerName;
            return $http.get(url);
        }
    }
})();