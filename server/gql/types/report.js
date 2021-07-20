const {GraphQLObjectType, GraphQLString} = require('graphql')
const ObservationType = require('./observation')
const UserType = require('./user')

module.exports = {
    name: 'ReportType',
    fields: ()=>({
        _id: {type: GraphQLString},
        author: {type: UserType},
        observations: [{type: ObservationType}],
        created: {type: GraphQLString,
            resolve: ({time})=>{
                return time.toISOString()
            }
        },
        link: {type: GraphQLString}
    })
}