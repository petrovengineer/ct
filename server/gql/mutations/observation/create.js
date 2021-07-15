const { GraphQLString } = require("graphql")
const ObservationType = require("../../types/observation")
const {Observation} = require('../../../mongo/models')
const mongoose = require('mongoose');

module.exports = {
    type: ObservationType,
    args: {
        text: {type: GraphQLString},
        time: {type: GraphQLString},
    },
    resolve: async (_, {text, time}, {_id, name})=>{
        if(!_id && !name)throw new Error('Auth failed!')
        const observation = new Observation({
            _id: new mongoose.Types.ObjectId(),
            text,
            time: (time?new Date(time):new Date()),
            author: {_id, name}
        })
        await observation.save()
        return observation.toObject();
    }
}