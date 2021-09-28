const { v4: uuidv4 } = require('uuid');
var AWS = require('aws-sdk');

AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("S3 Access key Id:", AWS.config.credentials.accessKeyId);
    }
  });

const bucketName = 'claimtracker';
const url =  `https://${bucketName}.s3.us-east-2.amazonaws.com/`

const uploadS3 = (fileStream)=>{
    return new Promise((done, fail)=>{
        const now = new Date();
        const dir = now.getFullYear() + '_' + (Number.parseInt(now.getMonth())+1) + '_' + now.getDate();
        const name = now.getHours()+'_'+now.getMinutes()+'_'+uuidv4()+'.jpg';
        const path = dir+'/'+name;
        const link = url + path;
    
        var objectParams = {Bucket: bucketName, 
            Key: path, 
            Body: fileStream,
            ACL:'public-read'
        };

        var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
        uploadPromise.then(async ()=>{
            done(link)
        }).catch((e)=>{
            console.log("Error upload to S3 ", e)
            fail()
        })
    })
}

const deleteS3 = (link)=>{
    return new Promise((done, fail)=>{
        const path = link.substr(url.length)
        console.log("PATH ", path)
        var params = {
            Bucket: bucketName,
            Key: path
          };
        var deletePromise = new AWS.S3({apiVersion: '2006-03-01'}).deleteObject(params).promise();
        deletePromise.then(async ()=>{
            done()
        }).catch((e)=>{
            console.log("Error delete to S3 ", e)
            fail()
        })
    })
}

module.exports = {uploadS3, deleteS3}