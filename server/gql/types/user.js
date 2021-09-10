let {GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLBoolean} = require('graphql')

const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "Represent an user",
    fields: ()=>({
      _id: {type: (GraphQLString)},
      name: {type: GraphQLString},
      email: {type: GraphQLString},
      active: {type: GraphQLBoolean},
      refreshToken: {type: GraphQLString}
    })
  })

module.exports = UserType;