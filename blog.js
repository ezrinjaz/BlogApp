var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog');

var app = express();
app.use(express.static('./public'));
app.use(bodyParser());

app.listen(8080, function() {
    console.log('Server listening at http://localhost:8080');
});

var BlogPost = require('./models/BlogPost');

app.get('/blogPosts', function(req,res) {
    BlogPost.find().exec().then(function(blogPosts){
        res.json(blogPosts);
    });
});

app.post('/blogPosts', function(req,res) {
    console.log('POST /blogPosts: ', req.body);
    var blogPost = new BlogPost(req.body);
    blogPost.save().then(function() {
        res.json(true);
    });
});

// app.filter('reverse', function() {
//   return function(posts) {
//     return posts.slice().reverse();
//   };
// });
