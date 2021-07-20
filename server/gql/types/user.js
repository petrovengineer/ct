let {GraphQLString, GraphQLObjectType, GraphQLNonNull} = require('graphql')

const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "Represent an user",
    fields: ()=>({
      _id: {type: new GraphQLNonNull(GraphQLString)},
      name: {type: GraphQLString},
      email: {type: GraphQLString},
      refreshToken: {type: GraphQLString}
    })
  })

module.exports = UserType;