const {GraphQLObjectType, GraphQLString} = require('graphql')

const AuthorType = new GraphQLObjectType({
    name: 'AuthorType',
    fields: ()=>({
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
    })
})

module.exports = AuthorType;