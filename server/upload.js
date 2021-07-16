const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const {uploadS3} = require('./s3')
const {Observation} = require('./mongo/models')

const uploadImage =  async (req, res)=>{
    try{
        console.log("REQ UPLOAD ", req.file, "ID ",req.body.oid)
        await sharp(fs.readFileSync(req.file.path))
        .resize({width: 320, height: 240, fit: sharp.fit.inside, withoutEnlargement: true})
        .toFile(path.resolve(__dirname, './temp/resized.jpg'));
        fs.unlink(req.file.path, ()=>{})
        const fileStream = fs.createReadStream(path.resolve(__dirname, './temp/resized.jpg'));
        const link = await uploadS3(fileStream)
        await Observation.updateOne({_id: req.body.oid}, {$push: {photos: link}})
        res.send(link);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = uploadImage