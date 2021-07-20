const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql")
const UserType = require('./user')

const ObservationType = new GraphQLObjectType({
    name: 'ObservationType',
    fields: ()=>({
        _id: {type: GraphQLString},
        text: {type: GraphQLString},
        time: {type: GraphQLString,
            resolve: ({time})=>{
                return time.toISOString()
            }
        },
        created: {type: GraphQLString,
            resolve: ({time})=>{
                return time.toISOString()
            }
        },
        photos: {type: new GraphQLList(GraphQLString)},
        author: {
            type: UserType
            // type: AuthorType,
            // resolve: (_, args, req)=>{
            //     if(req._id && req.name){
            //         return {_id: req._id, name: req.name}
            //     } else return null
            // }
        }
    })
})

module.exports = ObservationType;