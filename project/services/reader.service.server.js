/**
 * Created by kreenamehta on 12/3/16.
 */
module.exports = function (app, model) {

    app.get('/api/search/readers/:readerName', searchReadersByName);

    function searchReadersByName(req, res) {
        var readerName = req.params.readerName;
        model.userModel
            .findUserByName(readerName)
            .then(
                function (readers) {
                    res.json(readers);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }
};