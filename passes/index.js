const {createReport}  = require('docx-templates')
const fs = require('fs')
const data = require('./data')
const JsBarcode = require('jsbarcode');
const { Canvas } = require("canvas");

async function createDoc(template, output, data){
    const buffer = await createReport({
      template: fs.readFileSync(template),
      cmdDelimiter: ['{', '}'],
      additionalJsContext:{
        getBarcode: (num)=>{
          const canvas = new Canvas();
          const payload = JSON.stringify({renter:data.renter, num});
          JsBarcode(canvas, payload, {displayValue: false});
          const buf = canvas.toBuffer();
          return {width: 16, height: 2.8, data: buf, extension:'.png'}
        },
        getImageFromFile: async (path)=>{
            const buffer = fs.readFileSync(path);
            return { width: 16, height: 6, data: buffer, extension: '.jpg' };
          },
      },
      data
    });
    fs.writeFileSync(output, buffer)
}

function createPasses(data){
    var dir = './docs/'+data.renter;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const template = `./templates/pass-duble-${data.type}-test.docx`;
    const output = `./docs/${data.renter}/pass-${data.renter}-${data.type}.docx`;
    data.nums = [];
    for(let i=1; i<=data.count; i+=2){data.nums.push(i)}
    // console.log(data.nums)
    createDoc(template, output, data)
  }

  createPasses(data.OZON_TEMP)

// for(let item in data){
//     console.log(data[item])
//     createPasses(data[item])
// }

  // function createPasses(data, count){
//   const template = './templates/pass.docx';
//   for(let i=1; i<=count; i++){
//     const output = `./docs/pass-${data.renter}-${i}.docx`;
//     const newData = Object.assign({num:i}, data)
//     createDoc(template, output, newData)
//   }
// }

//{IMAGE getImageFromFile(schema)}

// function createDublePasses(data, count){
//     var dir = './docs/'+data.renter;
//     if (!fs.existsSync(dir)){
//         fs.mkdirSync(dir);
//     }
//     const template = `./templates/pass-duble-${data.type}-test.docx`;
//     for(let i=1; i<=count; i=i+2){
//       const output = `./docs/${data.renter}/pass-${data.renter}-${data.type}-${i},${i+1}.docx`;
//       const newData = Object.assign({num:i, first:i, second:i+1}, data)
//       createDoc(template, output, newData)
//     }
//   }