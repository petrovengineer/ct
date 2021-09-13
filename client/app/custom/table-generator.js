const { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, PageOrientation, HeadingLevel, ImportDotx } = require('docx');
import {addZero, getClearDate, getAmount} from "_app/time"
import {shortName} from '_app/usefull'
import template from "../templates/template.docx";
import axios from "axios";

const importDotx = new ImportDotx();

export class DocumentCreator{
    create(dates, entries, selected){
        // return new Promise((done, fail)=>{
            // let document;
        //     axios.get(template, {responseType: 'arraybuffer'}).then(res => {
        //         importDotx.extract(res.data).then((templateDocument) => {
        //             console.log("DOCUMENT", res)
        //             document = new Document(
        //                 {
        //                     sections: [
        //                         {
        //                             properties: {
        //                                 titlePage: templateDocument.titlePageIsDefined,
        //                             },
        //                             children: [new Paragraph("Hello World")],
        //                         },
        //                     ],
        //                 },
        //                 {
        //                     template: templateDocument,
        //                 },
        //             );
        //             console.log("END DOC", document)
        //             done(document);
        //         });
        //     });
        // })

        const document = new Document({
            styles: {
                default: {
                    heading1: {
                        run: {
                            size: 18,
                            bold: true,
                            italics: true,
                            color: "FF0000",
                        },
                        paragraph: {
                            spacing: {
                                after: 80,
                            },
                        },
                    },
                }
            },
            sections:[{
                size: {
                    orientation: PageOrientation.LANDSCAPE,
                },
                children:[
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [new Paragraph({children:[new TextRun({text:"ФИО", bold: true}),]})],
                                    }),
                                    ...dates.map(date=>{
                                        return new TableCell({
                                            children: [new Paragraph({
                                                text: `  ${addZero(date.getDate())}.${addZero((date.getMonth()+1))}  `,
                                                heading: HeadingLevel.HEADING_1,
                                            })],
                                        })
                                    })
                                ],
                            }),
                            ...entries.filter(e=>selected.indexOf(e.key_id)>-1).map(entry=>{
                                return new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph(`${shortName(entry.owner)}`)],
                                        }),
                                        ...dates.map(date=>{
                                            const entryDate = entry.dates.find(entryDate=>(entryDate.date.getTime()===getClearDate(date).getTime()))
                                            if(!entryDate)return new TableCell({
                                                children: [new Paragraph(`x`)],
                                            })
                                            return new TableCell({
                                                children: [new Paragraph(`${getAmount(entryDate.in, entryDate.out)}`)],
                                            })
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }]
        })
        return document;
    }
}