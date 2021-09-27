require('dotenv').config()
require('./mongo/connect')
const {Pass} = require('./mongo/models')

const {createReport}  = require('docx-templates')
const fs = require('fs')
const data = require('./data')
const JsBarcode = require('jsbarcode');
const { Canvas, createCanvas } = require("canvas");

const link = 'skud.claimtracker.ru/pass?_id='

var QRCode = require('qrcode')

async function getBarcode(data){
    try{
        console.log("BARCODE DATA", data)
        const canvas = createCanvas(100, 100)
        await QRCode.toCanvas(canvas, data)
        const buf = canvas.toBuffer();
        return {width: 5, height: 5, data: buf, extension:'.png'}
    }
    catch(e){
        console.log('Error:', e)
    }
}

async function createDoc(template, output, data){
    data.info = {};
    data.nums.map(async num=>{
        try{
            const doc = await Pass.findOne({renter:data.renter, num});
            let pass = null;
            if(!doc){
                pass = new Pass();
                pass.renter = data.renter;
                pass.num = num;
                pass.save()
                data.info[num] = pass._id;
                console.log("New pass", pass)
            }else {
                pass = doc;
                console.log("Exist pass", pass)
            }
            data.info[num] = link+pass._id.toString();

            const doc2 = await Pass.findOne({renter:data.renter, num: num+1});
            pass = null;
            if(!doc2){
                pass = new Pass();
                pass.renter = data.renter;
                pass.num = num+1;
                pass.save()
                data.info[num+1] = pass._id;
                console.log("New pass 2", pass)
            }else {
                pass = doc2;
                console.log("Exist pass 2", pass)
            }
            data.info[num+1] = link+pass._id.toString();

            const buffer = await createReport({
              template: fs.readFileSync(template),
              cmdDelimiter: ['{', '}'],
              additionalJsContext:{
                getBarcode,
                getImageFromFile: async (path)=>{
                    const buffer = fs.readFileSync(path);
                    return { width: 16, height: 5.5, data: buffer, extension: '.jpg' };
                  },
              },
              data
            });
            fs.writeFileSync(output, buffer)
        }
        catch(err){
            console.log("Mongoose error", err)
        }
    })

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
    console.log(data.nums)
    createDoc(template, output, data)
  }

  createPasses(data.TEST_TEMP)

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