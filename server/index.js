require('dotenv').config()
require('./mongo/connect.js')

const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./gql/schema.js');

let port = 3000;
const app = express();

var cors = require('cors');
app.use(cors());

const { graphqlUploadExpress } = require('graphql-upload');

const {authenticateToken} = require('./auth')
app.use(authenticateToken);

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

// var AWS = require("aws-sdk");

// var AWS = require('aws-sdk');

// AWS.config.loadFromPath('./credentials.json');

// var bucketName = 'claimtracker';
// var keyName = 'hello_world_NEW1.txt';

// var objectParams = {Bucket: bucketName, 
//       Key: 'new_folder/'+keyName, 
//       Body: 'Hello World!',
//       ACL:'public-read'
//     };

//     var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
// uploadPromise.then(
//   function(data) {
//     console.log("Successfully uploaded data to " + bucketName + "/" + keyName + ' ' + data);
//   });

// https://claimtracker.s3.us-east-2.amazonaws.com/new_folder/hello_world_NEW1.txt