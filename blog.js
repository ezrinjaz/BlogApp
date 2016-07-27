var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://okcoders:okcoders@okcoders.co/diana');

var app = express();
app.use(express.static('./public'));
app.use(bodyParser());

var port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log('Server listening at http://localhost:' +port);
});

var BlogPost = require('./models/BlogPost');

app.get('/blogPosts', function(req,res) {
    BlogPost.find().exec().then(function(blogPosts){
        res.json(blogPosts);
    });
});

app.post('/blogPosts', function(req,res) {
    var post = req.body;
    if(post._id) {
        console.log('POST /blogPosts update ID=' + post._id);
        BlogPost.findOneAndUpdate({_id:post._id}, post).exec().then(function () {
            console.log('findOneAndUpdate complete.');
            res.json(true);
        });
    } else {
        console.log('POST /blogPosts: ', req.body);
        var blogPost = new BlogPost(req.body);
        blogPost.save().then(function() {
            res.json(true); 
        });
    };
});

app.delete('/blogPosts/:id', function(req,res) {
    var id = req.params.id;
    BlogPost.findOneAndRemove({_id:id}).exec().then(function() {
        res.json(true);
    });
});