
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var AWS = require('aws-sdk');

const uploadImage =  async (req, res)=>{
    try{;
        await sharp(fs.readFileSync(req.file.path))
        .resize(300)
        .toFile(path.resolve(__dirname, './temp/resized.jpg'));
        fs.unlink(req.file.path, ()=>{})
        const fileStream = fs.createReadStream(path.resolve(__dirname, './temp/resized.jpg'));

        const now = new Date();
        const dir = now.getFullYear() + '_' + (Number.parseInt(now.getMonth())+1) + '_' + now.getDate();
        const name = now.getHours()+'_'+now.getMinutes()+'_'+uuidv4()+'.jpg';
        const fullPath = dir+'/'+name;
        var bucketName = 'claimtracker';
        const link = `https://${bucketName}.s3.us-east-2.amazonaws.com/${fullPath}`;

        var objectParams = {Bucket: bucketName, 
            Key: fullPath, 
            Body: fileStream,
            ACL:'public-read'
        };
        var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
        uploadPromise.then(
        ()=>{
            console.log("Uploaded", link)
        }).catch((e)=>{
            console.log("Error upload to S3 ", e)
        })

        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = uploadImage