const {createReport}  = require('docx-templates')
const {formatTime} = require('../time')
const JsBarcode = require('jsbarcode');
const { Canvas } = require("canvas");
import axios from 'axios';
import template from "../templates/report.docx";

// const observations = [
//     {_id:'1', text:'Баланс счета сотовой связи: 123.00р.', photos:['https://claimtracker.s3.us-east-2.amazonaws.com/2021_7_11/17_42_e9d99d86-c6a6-4fd9-babe-a9ca51f2930c.jpg', 'https://claimtracker.s3.us-east-2.amazonaws.com/2021_7_11/17_42_e9d99d86-c6a6-4fd9-babe-a9ca51f2930c.jpg'], time: (new Date()).toISOString()},
//     {_id:'2', text:'QWQWEQWEQWEWE.', photos:[], time: (new Date()).toISOString()},
// ]

// const data = {observations}

async function createDoc(data, done){
    console.log("OBSERV ", JSON.parse(JSON.stringify(data)))
    const blob = await axios.get(template, {responseType: 'arraybuffer'});
    const buffer = await createReport({
      template: blob.data,
      cmdDelimiter: ['{', '}'],
      additionalJsContext:{
        getImage: async (url)=>{
            // const res1 = await fetch(url);
            // console.log("IMG URL",res1)

            const res = await axios.get(url, {responseType: 'arraybuffer'});
            return { width: 16, height: 12, data: res.data, extension: '.jpg' }; 
        },
        getImageFromFile: async (path)=>{
          const buffer = fs.readFileSync(path);
          return { width: 16, height: 6, data: buffer, extension: '.jpg' };
        },
        formatTime
      },
      data
    });
    return done(buffer);
}

export default createDoc