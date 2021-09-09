const { GraphQLList } = require("graphql");
const { GraphQLBoolean } = require("graphql");
const { GraphQLString } = require("graphql");
const { GraphQLObjectType } = require("graphql");

module.exports = {
    PermissionType: new GraphQLObjectType({
        name: 'Permission',
        fields: {
            _id: {type: GraphQLString},
            name: {type: GraphQLString},
            read: {type: new GraphQLList(GraphQLString)},        
            write: {type: new GraphQLList(GraphQLString)},        
        }
    })
}