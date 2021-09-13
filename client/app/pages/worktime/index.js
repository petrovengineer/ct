import React, {useEffect, useState} from "react";
import WithAccess from "_hoc/WithAccess";
import Dates from "_components/dates"
import {addZero, weekDaysShort, getClearDate, getAmount} from "_app/time"
import {shortName} from '_app/usefull'
import Calendar from '_components/calendar'
import WithKeys from '_hoc/WithKeys'
import MultiSelect from '_components/multiselect'
import {DocumentCreator} from '../../custom/table-generator'
import { Packer } from "docx";
import { saveAs } from "file-saver";

const startWorkTime = 9;
const endWorkTime = 17;

export default ()=>(
    <WithAccess limit={null}>
        {({data: accesses, filter, setDateRange, setSkip, count, limit, setLimit})=>{
            const [dates, setDates] = useState([])
            const [entries, setEntries] = useState([])
            const [showTime, setShowTime] = useState(true)
            const [oneReader, setOneReader] = useState(false)
            const [selected, setSelected] = useState([])
            useEffect(()=>{
                setDates(getDates());
                if(limit !== undefined)return;
                if(!accesses)return;
                setEntries(getEntries());
            }, [accesses, oneReader])

            function getEntries(){
                const entries = [];
                for(let i=0; i<accesses.length;i++){
                    if(!accesses[i].key.owner)continue;
                    let entry = entries.find(e=>e.owner===accesses[i].key.owner)
                    if(!entry){
                        entry = {owner: accesses[i].key.owner, key_id: accesses[i].key.key_id, dates:[]}
                        entries.push(entry)
                    }
                    const accessDate = new Date(accesses[i].time);
                    if(accessDate.getHours()>=0 && accessDate.getHours()<=5)continue;
                    if(accessDate.getHours()>=18 && accessDate.getHours()<=23)continue;
                    const entryDateIndex = entry.dates.findIndex(entryDate=>(entryDate.date.getTime()===getClearDate(accessDate).getTime()))
                    if(entryDateIndex < 0){
                        const newDate = {in: undefined, out: undefined, date: getClearDate(accessDate)}
                        entry.dates.push(newDate);
                        if(accesses[i].action===1)newDate.in = accessDate;
                        if(accesses[i].action===0)newDate.out = accessDate;
                        continue;
                    }
                    if(
                        (!oneReader?accesses[i].action===1:true) && 
                        (!entry.dates[entryDateIndex].in || accessDate.getTime() < entry.dates[entryDateIndex].in.getTime())){
                        entry.dates[entryDateIndex].in = new Date(accessDate.getTime())
                    }
                    if(
                        (!oneReader?accesses[i].action===0:true) && 
                        (!entry.dates[entryDateIndex].out || accessDate.getTime() > entry.dates[entryDateIndex].out.getTime())){
                        entry.dates[entryDateIndex].out = new Date(accessDate.getTime())
                    }
                }
                // console.log("ENTRIES ", entries.map(e=>{e.dates return e}))
                return entries;
            }
            function getDates(){
                const dates = [];
                if(filter.startDate.getFullYear()!=filter.startDate.getFullYear())return;
                let date = new Date(filter.startDate.getFullYear(), filter.startDate.getMonth(), filter.startDate.getDate());
                let count = Math.floor((filter.endDate.getTime() - filter.startDate.getTime())/(1000*60*60*24));
                for(let day=0; day<=count; day++){
                    dates.push(new Date(date))
                    date.setDate(date.getDate()+1);
                }
                console.log("DATES ", dates.map(d=>d.toISOString()))
                return dates;
            }
            function renderTime(date){
                if(!date)return 'x';
                return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
            }
            function getColorClass(date, action){
                if(!date)return ""
                if(action===1){
                    if(date.getHours()>=startWorkTime)return "has-background-danger";
                }
                if(action===0){
                    if(date.getHours()<endWorkTime)return "has-background-danger";
                }
                return "has-background-success";
            }
            async function generate(){
                const documentCreator = new DocumentCreator();
                const doc = await documentCreator.create(dates, entries, selected)
                console.log("DOC ", doc)
                Packer.toBlob(doc).then(blob => {
                    console.log(blob);
                    saveAs(blob, "example.docx");
                    console.log("Document created successfully", blob);
                  });
            }
            if(!accesses)return <h1 className="title">Загрузка...</h1>
            return (
                <>
                    <h1 className="subtitle">Учёт рабочего времени</h1>
                    <div className="block">
                        <Calendar range startDate={filter.startDate} endDate={filter.endDate} onChange={setDateRange}/>
                    </div>
                    <div className="block">
                        <label class="checkbox is-flex is-align-content-center">
                            <input type="checkbox" checked={showTime} style={{height:'18px', width:'18px'}} onChange={()=>setShowTime(!showTime)}/>
                            Показать время
                        </label>
                        <label class="checkbox is-flex is-align-content-center">
                            <input type="checkbox" checked={oneReader} style={{height:'18px', width:'18px'}} onChange={()=>setOneReader(!oneReader)}/>
                            Учитывать один считыватель
                        </label>
                    </div>
                    <div className="block">
                        <WithKeys limit={9999999999}>
                            {({data:keys=[]})=><MultiSelect arr={keys.map(({_id, owner})=>({_id, name: shortName(owner)}))} selected={selected} setSelected={setSelected} multi/>}
                        </WithKeys>
                    </div>
                    <hr/>              
                    {(!filter.startDate || !filter.endDate || selected.length===0)?
                        <h1 className="subtitle mt-2 has-text-grey">Необходимо выбрать параметры...</h1>
                        :<div >
                            <div style={{display:'flex'}} className="block">
                                <table style={{width:'auto', flexShrink:0}} className="table">
                                    <tbody>
                                        <tr>
                                                <th>Сотрудник</th>
                                        </tr>
                                        {entries.filter(e=>selected.indexOf(e.key_id)>-1).map((entry, i)=>(
                                            <tr key={i} style={{height:'55px'}}>
                                                <td>{shortName(entry.owner)}</td>
                                            </tr>))}
                                    </tbody>
                                </table>
                                <div style={{overflowX:'auto', borderLeft:'1px solid #dbdbdb'}}>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                {dates.map((date,i)=>(<HeaderDates key={i} date={date}/>))}
                                            </tr>
                                            {entries.filter(e=>selected.indexOf(e.key_id)>-1).map((entry, i)=>(
                                                <tr key={i} style={{height:'55px'}}>
                                                    {dates.map((date,i)=>{
                                                        const entryDate = entry.dates.find(entryDate=>(entryDate.date.getTime()===getClearDate(date).getTime()))
                                                        if(!entryDate)return <td className="has-text-grey-light">x</td>
                                                        return <td >
                                                            <div className="is-flex">
                                                                <span className="mr-2 mt-1">
                                                                    {getAmount(entryDate.in, entryDate.out)}
                                                                </span>
                                                                {showTime && <span>
                                                                    <div className={'is-size-7 px-1 '+ getColorClass(entryDate.in, 1)}>{renderTime(entryDate.in)}</div>
                                                                    <div className={'is-size-7 px-1 ' + getColorClass(entryDate.out, 0)}>{renderTime(entryDate.out)}</div>
                                                                </span>}
                                                            </div>
                                                        </td>
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="block">
                                <button className="button is-success" onClick={generate}>Скачать</button>
                            </div>
                        </div>
                    }
                </>
            )
        }}
    </WithAccess>
)

function HeaderDates({date}){
    return (
        <th className={` ${(date.getDay()===6 || date.getDay()===0)?"has-text-danger":null}`} style={{minWidth:'100px'}}>
                <span>{weekDaysShort[date.getDay()]} </span>
                <span className="has-text-grey-light">{addZero(date.getDate())}.{addZero((date.getMonth()+1))}</span>
        </th>
    )
}