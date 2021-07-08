const { GraphQLString } = require('graphql')
let { LoginResponseType} = require('../../types')
const {User} = require('../../../mongo/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports = {
      type: LoginResponseType,
      description: "Login",
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
      },
      resolve: async (_, {email, password})=>{
        if(!email || !password){throw new Error('Email or password was not providet!')}
        const user = await User.findOne({email});
        if(!user) throw new Error('User not found!')
        if(await bcrypt.compare(password, user.password)){
            const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'});
            return {accessToken}
        }else throw new Error('Password wrong!')
      }
}