const { GraphQLList, GraphQLString, GraphQLInputObjectType, GraphQLInt,GraphQLObjectType } = require('graphql')
const {Observation} = require('../../../mongo/models')
const ObservationType = require("../../types/observation")
const FilterType = require("../../types/filter")

module.exports = {
    // type: {new GraphQLList(ObservationType)},
    type: new GraphQLObjectType({
        name:'ObservationsData', 
        fields:()=>({
            observations: {type: new GraphQLList(ObservationType)},
            count: {type: GraphQLInt}
        })
    }),
    args: {
        filter:{type: FilterType}
    },
    resolve: async (_,{filter = {}}, {_id})=>{
        console.log("OBS FILTER ", filter)
        const condition = { time:{$gte:filter.startDate, $lte:filter.endDate}};
        if(filter._id)condition._id = filter._id;
        const count =  await Observation
        .where(condition)
        .countDocuments();
        console.log("OBS COUNT", count)
        const observations =  await Observation
        .find(condition)
        .sort({time: -1})
        .skip(filter.skip)
        .limit(filter.limit)
        return {observations, count};
    }
}