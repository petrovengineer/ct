const mongoose = require('mongoose');

module.exports = {
    User: mongoose.model('User', 
    { 
        name: {type: String},
        secondName: {type: String},
        email: {type: String},
        password: String,
        refreshToken: String,
        active: {type: Boolean, default: true},
        created:  {type: Date, default: Date.now}
    })
}