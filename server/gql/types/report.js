const {GraphQLObjectType, GraphQLString, GraphQLList} = require('graphql')
const ObservationType = require('./observation')
const UserType = require('./user')

module.exports = new GraphQLObjectType({
    name: 'ReportType',
    fields: ()=>({
        _id: {type: GraphQLString},
        author: {type: UserType},
        observations: {type: new GraphQLList(ObservationType)},
        created: {type: GraphQLString,
            resolve: ({created})=>{
                return created.toISOString()
            }
        },
        time: {type: GraphQLString,
            resolve: ({time})=>{
                return time.toISOString()
            }
        },
    })
})