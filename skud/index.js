require('dotenv').config()
var express = require('express');
require('./mongo/connect.js')
const skud = require('./skud')

let port = process.env.PORT || 3000;
const app = express();

app.use('/', skud);

app.get('/test',(req, res)=>{
    return res.send('<h1>ClaimTracker Skud Test</h1>')
})

app.listen(port);

console.log('Skud APP port: '+ port);