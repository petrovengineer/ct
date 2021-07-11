let {GraphQLObjectType, GraphQLSchema} = require('graphql')
let userQueries = require('./queries/users')
let userMutations = require('./mutations/users')

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRootType',
  description: "Get something:)",
  fields: ()=>({
    ...userQueries
  })
})

const MutationRootType = new GraphQLObjectType({
  name: 'MutationRootType',
  description: 'Do mutation:/',
  fields: ()=>({
    ...userMutations,
  })
})

const Schema = new GraphQLSchema({
  query: QueryRootType,
  mutation: MutationRootType
});

module.exports = Schema;