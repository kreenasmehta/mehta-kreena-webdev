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
            if(canUpdateWidget(vm.widget)){
                vm.widget = WidgetService.updateWidget(vm.widgetId, vm.widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + " /page/" + vm.pageId +"/widget");
            } else{
                vm.error = getWidgetEditErrorMessage(vm.widget);
            }

        }

        /**
         * deletes a widget
         */
        function deleteWidget() {
            vm.widget = WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + " /page/" + vm.pageId +"/widget");
        }

        /**
         * returns true if the required fields of the widget are not undefined
         * @param widget
         * @returns {boolean}
         */
        function canUpdateWidget(widget) {
            if(widget.widgetType === "HEADER"){
                if(widget.text != undefined && widget.size != undefined){
                    return true;
                }
            }
            if(widget.widgetType === "HTML"){
                if(widget.text != undefined){
                    return true;
                }
            }
            if(widget.widgetType === "IMAGE"){
                if(widget.url != undefined){
                    return true;
                }
            }
            if(widget.widgetType === "YOUTUBE"){
                if(widget.url != undefined){
                    return true;
                }
            }
            return false;
        }

        function getWidgetEditErrorMessage(widget) {
            if(widget.widgetType === "HEADER"){
                return "Text and size are required fields.";
            }
            if(widget.widgetType === "HTML"){
                return "Text is a required field.";
            }
            if(widget.widgetType === "IMAGE"){
                return "URL is a required field.";
            }
            if(widget.widgetType === "YOUTUBE"){
                return "URL is a required field.";
            }
        }
    }
})();
