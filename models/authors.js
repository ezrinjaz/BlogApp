var mongoose = require('mongoose');

module.exports = mongoose.model('Author', {
    name: String,
    image: String
});
