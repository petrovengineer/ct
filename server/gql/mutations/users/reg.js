const { GraphQLString, GraphQLNonNull } = require('graphql')
let {RegResponseType} = require('../../types')
const mongoose = require('mongoose');
const {User} = require('../../../mongo/models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports = {
    type: RegResponseType,
    description: 'Add new User',
    args: {
      email: {type:  new GraphQLNonNull(GraphQLString)},
      name: {type: GraphQLString},
      password: {type: GraphQLString},
    },
    resolve: async (_, {name = '', email, password})=>{
      const user = await User.findOne({email});
      if(email != null && password != null && !user){
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({
              _id: new mongoose.Types.ObjectId(),
              password: hashedPassword,
              name,
              email,
          });
          await user.save();
          const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'});
          return {accessToken}
          // return user.toObject();
      }
      else if(user) throw new Error('User already exist.')
      else throw new Error('Something wrong...')
    }
}