const {GraphQLString, GraphQLInputObjectType, GraphQLInt, GraphQLList } = require('graphql')

const FilterType = new GraphQLInputObjectType({
    name: 'FilterType',
    fields: ()=>({
        _id: {type: new GraphQLList(GraphQLString)},
        skip: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
    })
})

module.exports = FilterType