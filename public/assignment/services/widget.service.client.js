/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        return api;

        /**
         * creates a new widget
         * @param pageId
         * @param widget
         * @returns {*}
         */
        function createWidget(pageId, widget) {
            var url = '/api/page/'+pageId+'/widget';
            return $http.post(url, widget);
        }

        /**
         * finds widgets for a given pageId
         * @param pageId
         * @returns {Array}
         */
        function findWidgetsByPageId(pageId) {
            var url = '/api/page/'+pageId+'/widget';
            return $http.get(url);
        }

        /**
         * finds a widget by widgetId
         * @param widgetId
         * @returns {*}
         */
        function findWidgetById(widgetId) {
            var url = '/api/widget/'+widgetId;
            return $http.get(url);
        }

        /**
         * updates a given widget
         * @param widgetId
         * @param widget
         * @returns {*}
         */
        function updateWidget(widgetId, widget) {
            var url ='/api/widget/'+widgetId;
            return $http.put(url, widget);
        }

        /**
         * deletes a given widget
         * @param widgetId
         */
        function deleteWidget(widgetId) {
            var url = '/api/widget/'+widgetId;
            return $http.delete(url);
        }
    }
})();
