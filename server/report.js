const {createReport}  = require('docx-templates')
const fs = require('fs')
const fetch = require('node-fetch')
const {formatTime} = require('./time')

const observations = [
    {_id:'1', text:'Баланс счета сотовой связи: 123.00р.', photos:['https://claimtracker.s3.us-east-2.amazonaws.com/2021_7_11/17_42_e9d99d86-c6a6-4fd9-babe-a9ca51f2930c.jpg', 'https://claimtracker.s3.us-east-2.amazonaws.com/2021_7_11/17_42_e9d99d86-c6a6-4fd9-babe-a9ca51f2930c.jpg'], time: (new Date()).toISOString()},
    {_id:'2', text:'QWQWEQWEQWEWE.', photos:[], time: (new Date()).toISOString()},
]

const data = {
    name: 'Скворцов Игорь',
    observations,
}

async function createDoc(){
    const template = fs.readFileSync('./templates/report.docx');

    const buffer = await createReport({
      template,
      cmdDelimiter: ['{', '}'],
      additionalJsContext:{
        getImage: async (url)=>{
            const response = await fetch(url);
            const buffer = await response.buffer();
            return { width: 16, height: 12, data: buffer, extension: '.jpg' }; 
        },
        formatTime
      },
      data
    });
    
    fs.writeFileSync('./docs/report.docx', buffer)
}

createDoc()

module.exports = {createDoc}