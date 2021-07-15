const {User} = require('../../../mongo/models')
let {UserType} = require('../../types')

module.exports = {
    type: UserType,
    description: 'Users Info',
    resolve: async (_, args, {_id})=>{
      if(!_id) throw new Error('Authentification fail!')
      return await User.findOne({_id});
    }
  }