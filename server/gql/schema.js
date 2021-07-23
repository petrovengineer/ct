let {GraphQLObjectType, GraphQLSchema} = require('graphql')
let userQueries = require('./queries/users')
let observationQueries = require('./queries/observations')
let userMutations = require('./mutations/users')
let observationMutations = require('./mutations/observation')
const reportQueries = require('./queries/report')
const reportMutations = require('./mutations/report')

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRootType',
  description: "Get something:)",
  fields: ()=>({
    ...userQueries,
    ...observationQueries,
    ...reportQueries
  })
})

const MutationRootType = new GraphQLObjectType({
  name: 'MutationRootType',
  description: 'Do mutation:/',
  fields: ()=>({
    ...userMutations,
    ...observationMutations,
    ...reportMutations
  })
})

const Schema = new GraphQLSchema({
  query: QueryRootType,
  mutation: MutationRootType
});

module.exports = Schema;