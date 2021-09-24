const mongoose = require('mongoose');


module.exports = {
    Pass: mongoose.model('Pass',{
        num: {type: Number}, 
        renter: {type: String},
        created:  {type: Date, default: Date.now},
    }),
}