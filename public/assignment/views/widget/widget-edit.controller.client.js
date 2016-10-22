/**
 * Created by kreenamehta on 10/21/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        /**
         * updates a widget
         */
        function updateWidget() {
            vm.widget = WidgetService.updateWidget(vm.widgetId, vm.widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + " /page/" + vm.pageId +"/widget");
        }

        /**
         * deleletes a widget
         */
        function deleteWidget() {
            vm.widget = WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + " /page/" + vm.pageId +"/widget");
        }
    }
})();
