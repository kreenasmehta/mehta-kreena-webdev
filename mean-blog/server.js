/**
 * Created by kreenamehta on 11/12/16.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogfall2016');

var PostSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: String,
    tag: {type: String, enum: ['POLITICS', 'ECONOMY', 'EDUCATION']},
    posted: {type: Date, default: Date.now()}
}, {collection: 'post'});

var PostModal = mongoose.model("PostModel", PostSchema);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));

app.post("/api/blogpost", createPost);
app.get("/api/blogpost", getAllPosts);
app.delete("/api/blogpost/:postId", deletePost);

function deletePost(req, res) {
    var postId = req.params.postId;
    PostModal
        .remove({_id:postId})
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function () {
                res.sendStatus(400);
            }
        );
}

function getAllPosts(req, res) {
    PostModal
        .find()
        .then(
            function (posts) {
                res.json(posts);
            },
            function () {
                res.sendStatus(400);
            }
        );
}

function createPost(req, res) {
    var post = req.body;
    PostModal
        .create(post)
        .then(
            function (postObj) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400);
            }
        );
}

app.listen(3000);
