const { GraphQLString } = require("graphql")
const ObservationType = require("../../types/observation")
const {Observation} = require('../../../mongo/models')
const {deleteS3} = require('../../../s3')

module.exports = {
    type: ObservationType,
    args: {
        link: {type: GraphQLString},
        oid: {type: GraphQLString}
    },
    resolve: async (_,{link, oid})=>{
        const o = await Observation.findOne({_id: oid});
        o.photos.pull(link);
        await o.save();
        await deleteS3(link);
        return o.toObject();
    }
}