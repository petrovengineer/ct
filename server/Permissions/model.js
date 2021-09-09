const mongoose = require('mongoose');

module.exports = mongoose.model('Permission', {
    name: {type: String},
    read: {type: [String]},
    write: {type: [String]},
})