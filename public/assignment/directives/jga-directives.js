/**
 * Created by kreenamehta on 11/1/16.
 */
(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable); // .jga-sortable
    
    function jgaSortable() {
        $(".jga-sortable").sortable({
            axis: 'y'
        });
    }
})();
