const { GraphQLList, GraphQLString, GraphQLInputObjectType } = require('graphql')
const ReportType = require('../../types/report')
const {Report} = require('../../../mongo/models')
const ObservationType = require("../../types/observation")
const mongoose = require('mongoose');

var ObservationsInputType = new GraphQLInputObjectType({
    name: 'ObservationsInputType',
    fields: ()=>({
        _id: {type: GraphQLString},
        text: {type: GraphQLString},
        photos: {type: new GraphQLList(GraphQLString)},
        time: {type: GraphQLString},
    })
})

module.exports = {
    type: ReportType,
    args:{
        observations: {type: new GraphQLList(ObservationsInputType)}
    },
    resolve: async (_,{observations = []}, {_id, name})=>{
        if(!_id && !name)throw new Error('Auth failed!');
        if(!observations || observations.length === 0)return;
        // modifedObservations = observations.map(o=>{o.time=new Date(o.time); return o;})
        const report = new Report({
            _id: new mongoose.Types.ObjectId(),
            observations,
            author: {_id, name},
        })
        await report.save()
        return report.toObject();
    }
}

