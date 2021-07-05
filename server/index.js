require('dotenv').config()
require('./mongo/connect.js')

const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./gql/schema.js');

let port = 3000;
const app = express();

const {authenticateToken} = require('./auth')
app.use(authenticateToken);

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);