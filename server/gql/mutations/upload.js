const { GraphQLString, GraphQLBoolean, GraphQLObjectType } = require('graphql')
const { GraphQLUpload } = require('graphql-upload')
// const {User} = require('../../mongo/models')
const fs = require('fs')

const UploadResponseType = new GraphQLObjectType({
    name: "UploadResponseType",
    description: "UploadResponseType",
    fields: ()=>({
      upload: {type: GraphQLBoolean}
    })
  })

module.exports = {
    type: UploadResponseType,
    description: 'Upload imgs',
    args: {
        file: {
            type: GraphQLUpload,
        },
    },
    async resolve(parent, { file }) {
        const { filename, mimetype, createReadStream } = await file;
        const readStream = createReadStream();
        const writeStream = fs.createWriteStream('./temp/img.jpg');
        readStream.pipe(writeStream)
        return true;
    },
}

