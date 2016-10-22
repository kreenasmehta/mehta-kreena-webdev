/**
 * Created by kreenamehta on 10/21/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.newWidget = newWidget;
        vm.widget = new Object();
        
        function newWidget(widgetType) {
            switch (widgetType){
                case "header":
                    vm.widget.widgetType = "HEADER";
                    vm.widget = WidgetService.createWidget(vm.pageId, vm.widget);
                    break;
                case "html":
                    vm.widget.widgetType = "HTML";
                    vm.widget = WidgetService.createWidget(vm.pageId, vm.widget);
                    break;
                case "image":
                    vm.widget.widgetType = "IMAGE";
                    vm.widget = WidgetService.createWidget(vm.pageId, vm.widget);
                    break;
                case "youtube":
                    vm.widget.widgetType = "YOUTUBE";
                    vm.widget = WidgetService.createWidget(vm.pageId, vm.widget);
                    break;
            }
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);

        }
        
    }
})();
