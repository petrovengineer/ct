const { GraphQLList, GraphQLObjectType, GraphQLInt} = require("graphql")
const {PermissionType} = require('./types')
const Permission = require('./model')

module.exports = {
    permissions: {
        type: new GraphQLObjectType({
            name: 'PermissionsList',
            fields: ()=>({
                data: {type: new GraphQLList(PermissionType)},
                count: {type: GraphQLInt}
            })
        }),
        resolve: async (root, args, req)=>{
            const count = await Permission.countDocuments({})
            const data = await Permission.find({})
            return {data, count}
        }
    }
}