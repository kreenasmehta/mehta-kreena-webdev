/**
 * Created by kreenamehta on 11/16/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server.js')();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {

        createWidget: createWidget

    };
    return api;
    
    function createWidget(pageId, widget) {
        widget._page = pageId;
        return WidgetModel.create(widget);
    }
};