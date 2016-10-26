/**
 * Created by kreenamehta on 10/20/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>First <a href="https://www.instagram.com/p/BH5KqZ-jvsR/?taken-by=gizmodo&amp;hl=en" target="_blank" rel="noopener">revealed at the European <em>Star Wars</em> Celebration</a> back in July, <a href="https://www.propelsw.com/" target="_blank" rel="noopener">Propel’s fleet of remote control Star Wars drones</a> is finally available for pre-order—at least if you live outside of the US. UK-based sites like <a href="https://www.firebox.com/Star-Wars-Battle-Drones-Collectors-Deluxe-Edition/p7818" target="_blank" rel="noopener">Firebox</a> are finally listing the drones as available for pre-order for $300 a piece.</p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        return api;

        /**
         * gets a new widgetId
         * @returns {string}
         */
        function getNewId(){
            var newId = parseInt(widgets[widgets.length - 1]._id) + 1;
            return newId.toString();
        }

        var widget;

        /**
         * creates a new widget
         * @param pageId
         * @param widget
         * @returns {*}
         */
        function createWidget(pageId, widget) {
            widget.pageId  = pageId;
            widget._id = getNewId();
            widgets.push(widget);
            return widget;
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
            for(var w in widgets){
                widget = widgets[w];
                if(widget._id === widgetId){
                    return widget;
                }
            }
            return null;
            
        }

        /**
         * updates a given widget
         * @param widgetId
         * @param widget
         * @returns {*}
         */
        function updateWidget(widgetId, widget) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    widgets[w] = widget;
                    return widgets[w];
                }
            }
            return null;
            
        }

        /**
         * deletes a given widget
         * @param widgetId
         */
        function deleteWidget(widgetId) {
            for(i=0;i<widgets.length;i++){
                if(widgets[i]._id === widgetId){
                    widgets.splice(i,1);
                    break;
                }
            }
        }
    }
})();
