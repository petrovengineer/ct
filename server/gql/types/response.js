const {GraphQLObjectType, GraphQLString} = require('graphql')

const LoginResponseType = new GraphQLObjectType({
    name: "LoginResponseType",
    description: "Return Token after Login",
    fields: ()=>({
      accessToken: {type: GraphQLString}
    })
  })

  const RegResponseType = new GraphQLObjectType({
    name: "RegResponseType",
    description: "Return Token after Reg",
    fields: ()=>({
      accessToken: {type: GraphQLString}
    })
  })

  module.exports = {LoginResponseType, RegResponseType}