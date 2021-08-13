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
          JsBarcode(canvas, JSON.stringify({renter:data.renter, num}),
          {displayValue: false}
          );
          const buf = canvas.toBuffer();
          return {width: 16, height: 2.8, data: buf, extension:'.png'}
        },
        formatTime
      },
      data
    });
    
    fs.writeFileSync(output, buffer)
}

// function createPasses(data, count){
//   const template = './templates/pass.docx';
//   for(let i=1; i<=count; i++){
//     const output = `./docs/pass-${data.renter}-${i}.docx`;
//     const newData = Object.assign({num:i}, data)
//     createDoc(template, output, newData)
//   }
// }

//{IMAGE getImageFromFile(schema)}

function createDublePasses(data, count){
  var dir = './docs/'+data.renter;
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  const template = `./templates/pass-duble-${data.type}.docx`;
  // const template = './templates/pass-duble-const.docx';
  for(let i=1; i<=count; i=i+2){
    const output = `./docs/${data.renter}/pass-${data.renter}-${data.type}-${i},${i+1}.docx`;
    const newData = Object.assign({num:i, first:i, second:i+1}, data)
    createDoc(template, output, newData)
  }
}

//==================================================================SBER============================================
// const data = {
//   schema: './templates/schema1.jpg',
//   renter: 'sber',
//   renterRu: 'СберЛогистика',
//   type: 'const'
// }
//let count = 33;

// const data = {
//   schema: './templates/schema1.jpg',
//   renter: 'sber',
//   renterRu: 'СберЛогистика',
//   type: 'temp'
// }
//let count = 23;

//====================================================DL==================================================

// const data = {
//   schema: './templates/schema2.jpg',
//   renter: 'dl',
//   renterRu: 'Деловые Линии',
//   type: 'temp'
// }
// let count = 20;

// const data = {
//   schema: './templates/schema2.jpg',
//   renter: 'dl',
//   renterRu: 'Деловые Линии',
//   type: 'const'
// }
// let count = 49

// const data = {
//   schema: './templates/schema7.jpg',
//   renter: 'okn',
//   renterRu: 'ОКН',
//   type: 'const'
// }
// let count = 215;

//==================================================NEVALAIN===============================================

// const data = {
//   schema: './templates/schema3.jpg',
//   renter: 'nevalain',
//   renterRu: 'НеваЛайн',
//   type: 'const'
// }
// let count = 20;

// const data = {
//   schema: './templates/schema3.jpg',
//   renter: 'nevalain',
//   renterRu: 'НеваЛайн',
//   type: 'temp'
// }
// let count = 16;

//=================================================AUGUST================================================

// const data = {
//   schema: './templates/schema4.jpg',
//   renter: 'avgust',
//   renterRu: 'Август',
//   type: 'temp'
// }
// let count = 29;

// const data = {
//   schema: './templates/schema4.jpg',
//   renter: 'avgust',
//   renterRu: 'Август',
//   type: 'const'
// }
// let count = 20;

//================================================WILDBERRIS=============================================

// const data = {
//   schema: './templates/schema5.jpg',
//   renter: 'wildberries',
//   renterRu: 'Вайлдберис',
//   type: 'const'
// }
// let count = 10;

// const data = {
//   schema: './templates/schema5.jpg',
//   renter: 'wildberries',
//   renterRu: 'Вайлдберис',
//   type: 'temp'
// }
// let count = 10;

//=================================================OKEY=================================================
// const data = {
//   schema: './templates/schema6const.jpg',
//   renter: 'okey',
//   renterRu: 'Окей',
//   type: 'const'
// }
// let count = 10;

// const data = {
//   schema: './templates/schema6temp.jpg',
//   renter: 'okey',
//   renterRu: 'Окей',
//   type: 'temp'
// }
// let count = 16;




createDublePasses(data, count)

module.exports = {createDoc}