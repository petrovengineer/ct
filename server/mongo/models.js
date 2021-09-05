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
    }),
    Report: mongoose.model('Report',{
        author: {_id:{type: String}, name:{type: String}},
        observations: {type: [{
                _id: {type: String},
                text: {type: String},
                time: {type: Date},
                photos: {type: [String]},
            }]
        } ,
        created:  {type: Date, default: Date.now},
        time:  {type: Date}
    }),
    Key: mongoose.model('Key',{
        data: {type: String, unique: true},
        owner: {type: String},
        created:  {type: Date, default: Date.now}
    }),
    Access: mongoose.model('Access',{
        action: {type: Number}, //0-exit, 1-enter
        key: {type: {
            key_id: {type: String},
            owner: {type: String},
            data: {type: String},
        }},
        time:  {type: Date, default: Date.now},
    })
}