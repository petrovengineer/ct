const { GraphQLString, GraphQLNonNull } = require('graphql')
let {UserType, LoginResponseType} = require('../types')
const {User} = require('../../mongo/models')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const {generateAccessToken} = require('../../auth')
const jwt = require('jsonwebtoken');

module.exports = {
    reg: {
      type: UserType,
      description: 'Add new User',
      args: {
        email: {type:  new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        secondName: {type: GraphQLString},
        password: {type: GraphQLString},
      },
      resolve: async (_, {name = '', secondName = '', email, password}, req)=>{
        const user = await User.findOne({email});
        if(email != null && password != null && !user){
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                password: hashedPassword,
                name,
                secondName,
                email,
            });
            await user.save();
            return user.toObject();
        }
        else if(user) throw new Error('User already exist.')
        else throw new Error('Something wrong...')
      }
    },
    login:{
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
}