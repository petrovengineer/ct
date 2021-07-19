const { GraphQLList, GraphQLString, GraphQLInputObjectType, GraphQLInt } = require('graphql')
const {Observation} = require('../../../mongo/models')
const ObservationType = require("../../types/observation")
const FilterType = require("../../types/filter")

module.exports = {
    type: new GraphQLList(ObservationType),
    args: {
        filter:{type: FilterType}
    },
    resolve: async (_,{filter = {}})=>{
        console.log("FILTER ", filter)
        const observations =  await Observation
        .find({time:{$gte:filter.startDate, $lte:filter.endDate}})
        .sort({time: -1})
        .skip(filter.skip)
        .limit(filter.limit)
        return observations;
    }
}