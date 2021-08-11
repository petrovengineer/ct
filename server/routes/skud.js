var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const {formatDate} = require('../time.js');
const {Key, Access} = require('../mongo/models')
const axios = require('axios')

router.use(bodyParser.json())

router.post('/access', async ({body}, res)=>{
    if(!body.data)return res.sendStatus(400);
  const key = await Key.findOne({data:body.data}).select('owner').lean();
  console.log(formatDate(new Date().toISOString()), "Request from PI: ", body, " ",(key?key.owner:'Неизвестный пользователь') )
  let data = null;
  if(key)data = {key_id:key._id, owner: key.owner, data: body.data}
  else data = {key_id: null, owner: null, data: body.data}
  const access = new Access({action: 1, key: data})
  access.save((err)=>{
      if(err)return sendStatus(401);
      res.sendStatus(200)
  })
})

router.get('/access', async (req, res)=>{
    try{
        // const data = "123123"
        // axios.post('http://localhost:3000/skud/access', {data})
        const accessList = await Access.find({}).lean();
        return res.send({data:accessList});
    }catch(e){console.log(e.message); return res.sendStatus(400)}
})

router.post('/key', ({body}, res)=>{
    if(!body.data || !body.owner)res.sendStatus(400);
    const key = new Key({data:body.data, owner: body.owner})
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

module.exports = router;