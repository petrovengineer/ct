const {GraphQLString, GraphQLInputObjectType, GraphQLInt } = require('graphql')

const FilterType = new GraphQLInputObjectType({
    name: 'FilterType',
    fields: ()=>({
        skip: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
    })
})

module.exports = FilterType