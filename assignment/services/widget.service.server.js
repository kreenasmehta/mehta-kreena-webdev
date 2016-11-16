/**
 * Created by kreenamehta on 10/26/16.
 */
module.exports = function (app, model) {

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
    app.put("/api/page/:pageId/widget", updateWidgetIndices);


    /**
     * creates a new widget for the given pageId
     * @param req
     * @param res
     */
    function createWidget(req, res) {
        var pageId = req.params.pid;
        var widget = req.body;
        //create widget
        // find page by ID
        // add widget to the widgets array of page
        model.widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    model.pageModel
                        .findPageById(pageId)
                        .then(
                            function (page) {
                                model.pageModel
                                    .updatePageWidgets(page, widget)
                                    .then(
                                        function (status) {
                                            res.send(widget);
                                        },
                                        function (error) {
                                            res.sendStatus(400).message(error);
                                        }
                                    );
                            },
                            function (error) {
                                res.sendStatus(400).message(error);
                            }
                        );
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds widgets for a given pageId
     * @param req
     * @param res
     */
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        // var resultWidget = [];
        // for(var w in widgets){
        //     if(widgets[w].pageId === pageId){
        //         resultWidget.push(widgets[w]);
        //     }
        // }
        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.send(widgets);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds a widget by widgetId
     * @param req
     * @param res
     */
    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        model.widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    if(widget){
                        res.send(widget);
                    }else{
                        res.send('0');
                    }
                },
                function (error) {

                }
            );
    }

    /**
     * updates the given widget
     * @param req
     * @param res
     */
    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        model.widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * deletes the given widget
     * @param req
     * @param res
     */
    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        model.widgetModel
            .deleteWidget(widgetId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }

    /**
     * uploads an image
     * @param req
     * @param res
     */
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
        var url = '/assignment/uploads/'+filename;

        model.widgetModel
            .uploadImage(widgetId, originalname, width, url)
            .then(
                function (status) {
                    res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }


    /**
     * updates the index of the widget in the array to maintain the order of widgets
     * while sorting them
     * @param req
     * @param res
     */
    function updateWidgetIndices(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;

        var realInitial = -1;
        var realFinal = -1;
        var loopInCurrentPage = -1;

        for(var w in widgets){
            if(widgets[w].pageId === pageId){
                loopInCurrentPage++;
                if(loopInCurrentPage === parseInt(initial)){
                    realInitial = w;
                }else if(loopInCurrentPage === parseInt(final)){
                    realFinal = w;
                }
            }
        }

        widgets.splice(realFinal, 0, widgets.splice(realInitial, 1)[0]);
        res.send(200);
    }
};