/**
 * Created by kreenamehta on 11/13/16.
 */
(function () {
    angular
        .module("BlogApp", [])
        .controller("BlogController", BlogController);
    
    function BlogController($scope, $http) {
        $scope.createPost= createPost;
        $scope.deletePost= deletePost;

        function init() {
            getAllPosts();
        }
        init();

        
        function getAllPosts() {
            $http
                .get("/api/blogpost")
                .success(function (posts) {
                    $scope.posts=posts;
                })
                .error(function () {
                    
                });
        }

        function createPost(post) {
            $http
                .post("/api/blogpost", post)
                .success(function () {
                    getAllPosts();
                })
                .error(function () {
                    
                });
        }

        function deletePost(postId) {
            $http
                .delete("/api/blogpost/"+postId)
                .success(function () {
                    getAllPosts();
                })
                .error(function () {

                });
        }
    }
})();
