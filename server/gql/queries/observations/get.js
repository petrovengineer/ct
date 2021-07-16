const { GraphQLList, GraphQLString, GraphQLInputObjectType, GraphQLInt } = require('graphql')
const {Observation} = require('../../../mongo/models')
const ObservationType = require("../../types/observation")

const FilterType = new GraphQLInputObjectType({
    name: 'FilterType',
    fields: ()=>({
        skip: {type: GraphQLInt},
        limit: {type: GraphQLInt},
    })
})

module.exports = {
    type: new GraphQLList(ObservationType),
    args: {
        filter:{type: FilterType}
    },
    resolve: async (_,{filter = {}})=>{
        console.log("FILTER ", filter)
        const observations =  await Observation.find().sort({time: -1}).skip(filter.skip).limit(filter.limit)
        return observations;
    }
}