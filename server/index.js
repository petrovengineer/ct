require('dotenv').config()
require('./mongo/connect.js')
const skud = require('./routes/skud')

const express = require('express');

const {graphqlHTTP} = require('express-graphql');
const schema = require('./gql/schema.js');

let port = process.env.PORT || 3000;
const app = express();

var cors = require('cors');
app.use(cors());

const {authenticateToken} = require('./auth')
app.use(authenticateToken)

app.use('/skud', skud);

app.get('/',(req, res)=>{
  return res.send('<h1>ClaimTracker</h1>')
})

app.post('/', 
  graphqlHTTP({
    schema: schema,
    graphiql: true
  }));

var multer = require('multer');
var upload = multer({ dest: './temp/', limits: {
    fileSize: 10 * 1024 * 1024,
}});
const uploadImage = require('./upload')

app.post('/upload', upload.single('file'), uploadImage)

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);