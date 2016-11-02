/**
 * Created by kreenamehta on 10/26/16.
 */
module.exports = function (app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
    var fs = require('fs');

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>First <a href="https://www.instagram.com/p/BH5KqZ-jvsR/?taken-by=gizmodo&amp;hl=en" target="_blank" rel="noopener">revealed at the European <em>Star Wars</em> Celebration</a> back in July, <a href="https://www.propelsw.com/" target="_blank" rel="noopener">Propel’s fleet of remote control Star Wars drones</a> is finally available for pre-order—at least if you live outside of the US. UK-based sites like <a href="https://www.firebox.com/Star-Wars-Battle-Drones-Collectors-Deluxe-Edition/p7818" target="_blank" rel="noopener">Firebox</a> are finally listing the drones as available for pre-order for $300 a piece.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post('/api/page/:pid/widget', createWidget);
    app.get('/api/page/:pid/widget', findAllWidgetsForPage);
    app.get('/api/widget/:wgid', findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.delete('/api/widget/:wgid', deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    /**
     * creates a new widget for the given pageId
     * @param req
     * @param res
     */
    function createWidget(req, res) {
        var pageId = req.params.pid;
        var widget = req.body;
        widget._id = (new Date().getTime().toString());
        widget.pageId = pageId;
        widgets.push(widget);
        res.send(widget);
    }

    /**
     * finds widgets for a given pageId
     * @param req
     * @param res
     */
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        var resultWidget = [];
        for(var w in widgets){
            if(widgets[w].pageId === pageId){
                resultWidget.push(widgets[w]);
            }
        }
        res.send(resultWidget);
    }

    /**
     * finds a widget by widgetId
     * @param req
     * @param res
     */
    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        for(var w in widgets){
            if(widgets[w]._id === widgetId){
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * updates the given widget
     * @param req
     * @param res
     */
    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        for(var w in widgets){
            if(widgets[w]._id === widgetId){
                widgets[w] = widget;
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }

    /**
     * deletes the given widget
     * @param req
     * @param res
     */
    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        for(var w in widgets){
            if(widgets[w]._id === widgetId){
                widgets.splice(w, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function uploadImage(req, res) {


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var websiteId        = req.body.websiteId;
        var pageId        = req.body.pageId;
        var myFile        = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        filename += originalname;
        fs.renameSync(path, destination + "/" + filename);

        for(var w in widgets){
            if(widgets[w]._id === widgetId){
                widgets[w].name = originalname;
                widgets[w].width = width;
                widgets[w].url = '/assignment/uploads/'+filename;
//                res.send(widgets[w]);
                res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                return;
            }
        }
        res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }
};