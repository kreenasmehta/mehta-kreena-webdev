/**
 * Created by kreenamehta on 11/1/16.
 */
(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable); // .wam-sortable
    
    function wamSortable() {
        console.log("Hello from sortable");
        $(".wam-sortable").sortable({
            axis: 'y'
        });
    }
})();
