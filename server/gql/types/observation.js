const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");


const ObservationType = new GraphQLObjectType({
    name: 'ObservationType',
    fields: ()=>({
        _id: {type: GraphQLString},
        text: {type: GraphQLString},
        time: {type: GraphQLString},
        photos: {type: new GraphQLList(GraphQLString)},
        author: {
            type: AuthorType,
            resolve: (_, args, req)=>{
                if(req._id && req.name){
                    return {_id: req._id, name: req.name}
                } else return null
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'AuthorType',
    fields: ()=>({
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
    })
})

module.exports = ObservationType;