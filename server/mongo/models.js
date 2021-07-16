const mongoose = require('mongoose');

module.exports = {
    User: mongoose.model('User', 
    { 
        name: {type: String},
        email: {type: String},
        password: String,
        refreshToken: String,
        active: {type: Boolean, default: true},
        created:  {type: Date, default: Date.now}
    }),
    Observation: mongoose.model('Observation',{
        text: {type: String},
        time:  {type: Date, default: Date.now},
        photos: {type: [String], default: []},
        author: {_id:{type: String}, name:{type: String}},
        created:  {type: Date, default: Date.now}
    })
}