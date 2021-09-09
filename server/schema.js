let {GraphQLObjectType, GraphQLSchema} = require('graphql')
let userQueries = require('./gql/queries/users')
let observationQueries = require('./gql/queries/observations')
let userMutations = require('./gql/mutations/users')
let observationMutations = require('./gql/mutations/observation')
const reportQueries = require('./gql/queries/report')
const reportMutations = require('./gql/mutations/report')
const permissionQueries = require('./Permissions/queries')
const permissionMutations = require('./Permissions/mutations')

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRootType',
  description: "Get something:)",
  fields: ()=>({
    ...userQueries,
    ...observationQueries,
    ...reportQueries,
    ...permissionQueries
  })
})

const MutationRootType = new GraphQLObjectType({
  name: 'MutationRootType',
  description: 'Do mutation:/',
  fields: ()=>({
    ...userMutations,
    ...observationMutations,
    ...reportMutations,
    ...permissionMutations
  })
})

const Schema = new GraphQLSchema({
  query: QueryRootType,
  mutation: MutationRootType
});

module.exports = Schema;