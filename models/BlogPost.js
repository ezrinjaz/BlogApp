var mongoose = require('mongoose');

var BlogPost = mongoose.model('blogPost', {
    title: String,
    body: String
});

module.exports = BlogPost;
