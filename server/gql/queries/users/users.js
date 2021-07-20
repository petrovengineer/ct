let UserType = require('../../types/user')
let {GraphQLList, GraphQLString} = require('graphql')
const {User} = require('../../../mongo/models')

module.exports = {
        type: new GraphQLList(UserType),
        description: 'List of Users',
        args: {
            filter: {type: GraphQLString}
        },
        resolve: async (_, args)=>{
          return await User.find();
        }
}