const { GraphQLList, GraphQLString, GraphQLInputObjectType } = require('graphql')
const ReportType = require('../../types/report')
const {Report} = require('../../../mongo/models')
const ObservationType = require("../../types/observation")

module.exports = {
    type: ReportType,
    args:{
        observations: {type: new GraphQLList(GraphQLString)}
    },
    resolve: async (_,{observations = []}, {_id, name})=>{
        if(!_id && !name)throw new Error('Auth failed!')
        const report = new Report({
            _id: new mongoose.Types.ObjectId(),
            observations,
            author: {_id, name}
        })
        await report.save()
        return report.toObject();
    }
}

// var ObservationsInputType = new GraphQLInputObjectType({
//     name: 'ObservationsInputType',
//     fields: ()=>({
//         _id: {type: new GraphQLList(GraphQLString)}
//     })
// })