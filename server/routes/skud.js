var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const {formatDate} = require('../time.js');
const {Key, Access} = require('../mongo/models')
const validate = require('../validate')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/access', async ({body}, res)=>{
    if(!body.data)return res.sendStatus(400);
    const key = await Key.findOne({data:body.data}).select('owner').lean();
    console.log(formatDate(new Date().toISOString()), "Request from PI: ", body, " ",(key?key.owner:'Неизвестный пользователь') )
    let data = null;
    if(key)data = {key_id:key._id, owner: key.owner, data: body.data}
    else data = {key_id: null, owner: null, data: body.data}
    const {time = new Date()} = body;
    const access = new Access({action: 1, key: data, time})
    access.save((err)=>{
        if(err)return sendStatus(401);
        res.sendStatus(200)
    })
})

router.get('/access', async (req, res)=>{
    try{
        console.log("PARAMS ",req.query);
        let filter = req.query;
        const count = await Access.countDocuments({})
        .where({time:{$gte:filter.startDate || 0, $lte:filter.endDate || new Date()}})
        const accessList = await Access.find({})
        .where({time:{$gte:filter.startDate || 0, $lte:filter.endDate || new Date()}})
        .skip(parseInt(filter.skip))
        .limit(parseInt(filter.limit))
        .sort({time:-1})
        .lean();
        return res.send({data:accessList, count});
    }catch(e){console.log(e.message); return res.sendStatus(400)}
})

router.post('/key', ({body}, res)=>{
    if(!body.data || !body.owner)res.sendStatus(400);
    const key = new Key({data:body.data, owner: body.owner})
    key.save((err, doc)=>{
        if(err){
            console.log(err.message);
            return res.sendStatus(401);
        }
        console.log(formatDate(new Date().toISOString()), "Request from PI: ", body," " ,key.toObject())
        return res.send(doc.toObject())
    })
  })

router.put('/key', async ({body}, res)=>{
    if(!body.data || !body.owner)res.sendStatus(400);
    const key = await Key.findOne({data: body.data});
    key.owner = body.owner;
    key.save((err)=>{
        if(err){
            console.log(err.message);
            return res.sendStatus(401);
        }
        console.log(formatDate(new Date().toISOString()), "Request from PI: ", body," " ,key.toObject())
        return res.sendStatus(200)
    })
})

router.get('/exit', (req, res)=>{
  console.log("Request from PI: EXIT")
  const access = new Access({action: 0, key: null})
  access.save((err)=>{
      if(err)return sendStatus(401);
      res.sendStatus(200)
  })
})

router.get('/keys', (req, res)=>{
    Key.find({}).exec((err, docs)=>{
        if(err)return res.sendStatus(400);
        console.log("Request from PI: GET KEYS ")
        res.send(docs.map(d=>d.data))
    })
})

router.get('/keysfull', async (req, res)=>{
    try{
        let filter = req.query;
        console.log("PARAMS ",req.query);
        const count = await Key.countDocuments({})
        await Key.find({})
        // .where({created:{$gte:filter.startDate || 0, $lte:filter.endDate || new Date()}})
        .skip(parseInt(filter.skip || 0))
        .limit(parseInt(filter.limit || undefined))
        .sort(filter && filter.sort && JSON.parse(filter.sort))
        .lean()
        .exec((err, data)=>{
            if(err)return res.sendStatus(400);
            res.send({data, count})
        })
    }catch(e){
        console.log(e)
    }
})

router.delete('/key', async ({query}, res)=>{
    try{
        console.log("Request: REMOVE KEY ", query)
        if(!query._id)return res.sendStatus(400);
        await Key.findOneAndDelete({_id:query._id})
        return res.sendStatus(200)
    }
    catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
})

router.patch('/access', async (req, res)=>{
    try{
        const accessList = await Access.find({'key.key_id':null})
        let knownKeys = []
        for(let i=0; i<accessList.length; i++){
            // let index = knownKeys.findIndex(key=>key.data===accessList[i].key.data)
            // if(index===-1){
                let key = await Key.findOne({data: accessList[i].key.data})
                if(key)knownKeys.push(key.toObject())
                else continue;
                // accessList[i].key.key_id = key._id;
                // accessList[i].key.owner = key.owner;
            // }else{
                // accessList[i].key.key_id = knownKeys[index]._id;
                // accessList[i].key.owner = knownKeys[index].owner;
            // }
            let access = await Access.findByIdAndUpdate(accessList[i]._id, {$set:{
                'key.key_id': key._id,
                'key.owner': key.owner
            }})
            console.log(access.toObject())
        }
        // console.log(accessList)

        res.send(accessList)
    }
    catch(e){
        console.log(e)
    }
})

module.exports = router;