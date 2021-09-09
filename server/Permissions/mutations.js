const { GraphQLString, GraphQLBoolean, GraphQLList} = require("graphql");
const {PermissionType} = require('./types')
const Permission = require('./model')
const messages = require('./messages');

module.exports = {
    create: {
        type: PermissionType,
        args: {
            name: {type: GraphQLString}
        },
        resolve: async (root, {name}, req)=>{
            try{
                if(!name)throw new Error(messages.NAME_NOT_SPECIFIED)
                const permission = new Permission({name})
                await permission.save()
                return permission.toObject()
            }
            catch(e){
                throw new Error(e.message)
            }
        }
    },
    remove: {
        type: GraphQLBoolean,
        args: {
            _id: {type: GraphQLString}
        },
        resolve: async (root, {_id}, req)=>{
            try{
                if(!_id)throw new Error(messages.ID_NOT_SPECIFIED)
                await Permission.deleteOne({_id})
                return true
            }catch(e){
                throw new Error(e.message)
            }
        }
    },
    update: {
        type: PermissionType,
        args: {
            _id: {type: GraphQLString},
            read: {type: new GraphQLList(GraphQLString)},
            write: {type: new GraphQLList(GraphQLString)}
        },
        resolve: async (root, {_id, read, write})=>{
            try{
                if(!_id)throw new Error(messages.ID_NOT_SPECIFIED)
                if(!read && !write)throw new Error(messages.PAYLOAD_NOT_SPECIFIED)
                const permission = await Permission.findOne({_id})
                if(read)permission.read = read;
                if(write)permission.write = write;
                await permission.save()
                return permission.toObject()
            }catch(e){
                throw new Error(e.message)
            }
        }
    }
}