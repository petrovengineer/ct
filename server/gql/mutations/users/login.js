const { GraphQLString } = require('graphql')
let { LoginResponseType} = require('../../types/response')
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
        console.log("LOGIN ", user._id, user.name)
        if(await bcrypt.compare(password, user.password)){
            const accessToken = jwt.sign({_id: user._id, name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'});
            return {accessToken}
        }else throw new Error('Password wrong!')
      }
}