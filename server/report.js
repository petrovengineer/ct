const {createReport}  = require('docx-templates')
const fs = require('fs')
const fetch = require('node-fetch')
const {formatTime} = require('./time')
const JsBarcode = require('jsbarcode');
const { Canvas } = require("canvas");

// const observations = [
//     {_id:'1', text:'Баланс счета сотовой связи: 123.00р.', photos:['https://claimtracker.s3.us-east-2.amazonaws.com/2021_7_11/17_42_e9d99d86-c6a6-4fd9-babe-a9ca51f2930c.jpg', 'https://claimtracker.s3.us-east-2.amazonaws.com/2021_7_11/17_42_e9d99d86-c6a6-4fd9-babe-a9ca51f2930c.jpg'], time: (new Date()).toISOString()},
//     {_id:'2', text:'QWQWEQWEQWEWE.', photos:[], time: (new Date()).toISOString()},
// ]

// const data = {
//     name: 'Скворцов Игорь',
//     observations,
// }

// const template = './templates/report.docx';
// const output = './docs/report.docx';

async function createDoc(template, output, data){
    const buffer = await createReport({
      template: fs.readFileSync(template),
      cmdDelimiter: ['{', '}'],
      additionalJsContext:{
        getImage: async (url)=>{
            const response = await fetch(url);
            const buffer = await response.buffer();
            return { width: 16, height: 12, data: buffer, extension: '.jpg' }; 
        },
        getImageFromFile: async (path)=>{
          const buffer = fs.readFileSync(path);
          return { width: 16, height: 6, data: buffer, extension: '.jpg' };
        },
        getBarcode: (num)=>{
          const canvas = new Canvas();
          const payload = JSON.stringify({renter:data.renter, num});
          JsBarcode(canvas, payload, {displayValue: false});
          const buf = canvas.toBuffer();
          return {width: 16, height: 2.8, data: buf, extension:'.png'}
        },
        formatTime
      },
      data
    });
    fs.writeFileSync(output, buffer)
}

module.exports = {createDoc}