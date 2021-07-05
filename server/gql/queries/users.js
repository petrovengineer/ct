let {UserType} = require('../types')
let {GraphQLList, GraphQLString} = require('graphql')
const {User} = require('../../mongo/models')

module.exports = {
    users: {
        type: new GraphQLList(UserType),
        description: 'List of Users',
        args: {
            filter: {type: GraphQLString}
        },
        resolve: async (_, args)=>{
          return await User.find();
        }
      },
    user: {
      type: UserType,
      description: 'Users Info',
      resolve: async (_, args, {email})=>{
        console.log("EMAIL ", email)
        if(!email) throw new Error('Authentification fail!')
        return await User.findOne({email});
      }
    }
}