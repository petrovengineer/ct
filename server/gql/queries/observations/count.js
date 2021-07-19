const {GraphQLInt } = require('graphql')
const {Observation} = require('../../../mongo/models')
const FilterType = require("../../types/filter")

module.exports = {
    type: GraphQLInt,
    args: {
        filter:{type: FilterType}
    },
    resolve: async (_,{filter = {}})=>{
        console.log("FILTER ", filter)
        const count =  await Observation
        .where({time:{$gte:filter.startDate, $lte:filter.endDate}})
        .countDocuments();
        console.log("COUNT ",count)
        return count;
    }
}