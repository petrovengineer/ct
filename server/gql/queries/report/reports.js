const {GraphQLList} = require('graphql');
const ReportType = require('../../types/report');
const {Report} = require('../../../mongo/models');
const FilterType = require("../../types/filter")

module.exports = {
    type: new GraphQLList(ReportType),
    args: {
        filter:{type: FilterType}
    },
    resolve: async (_,{filter = {}})=>{
        console.log("REPORT FILTER ", filter)
        const reports =  await Report
        .find({time:{$gte:filter.startDate, $lte:filter.endDate}})
        .sort({time: -1})
        .skip(filter.skip)
        .limit(filter.limit)
        return reports;
    }
};
