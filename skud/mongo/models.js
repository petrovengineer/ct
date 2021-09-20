const mongoose = require('mongoose');


module.exports = {
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
    }),
}