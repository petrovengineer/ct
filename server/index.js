require('dotenv').config()
require('./mongo/connect.js')

const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./gql/schema.js');

let port = 3000;
const app = express();

var cors = require('cors');
app.use(cors());

const {authenticateToken} = require('./auth')
app.use(authenticateToken);

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);

// var AWS = require("aws-sdk");

// var AWS = require('aws-sdk');
// var uuid = require('uuid');

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