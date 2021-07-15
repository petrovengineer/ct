const { GraphQLList, GraphQLString } = require('graphql')
const {Observation} = require('../../../mongo/models')
const ObservationType = require("../../types/observation")

module.exports = {
    type: new GraphQLList(ObservationType),
    args: {
        filter: {type: GraphQLString}
    },
    resolve: async ()=>{
        const observations =  await Observation.find()
        return observations.map(o=>{
            const newO = Object.assign({}, o.toObject());
            newO.time = (new Date(o.time).toISOString())
            return newO;
        })
    }
}