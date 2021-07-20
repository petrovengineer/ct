const { GraphQLList } = require('graphql')
const ReportType = require('../../types/report')
const {Report} = require('../../../mongo/models')

module.exports = {
    type: ReportType,
    args:{
        observations: {type: new GraphQLList(GraphQLString)}
    },
    resolve: (_,{observations = []}, {_id, name})=>{
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