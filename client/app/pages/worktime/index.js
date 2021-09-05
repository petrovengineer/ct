import React, {useEffect, useState} from "react";
import WithAccess from "_hoc/WithAccess";
import Dates from "_components/dates"
import {addZero, weekDaysShort} from "_app/time"
import {shortName} from '_app/usefull'
import Calendar from '_components/calendar'

const startWorkTime = 9;

export default ()=>(
    <WithAccess limit={null}>
        {({data, filter, setDateRange, setSkip, count, limit, setLimit})=>{
            const [dates, setDates] = useState([])
            const [entries, setEntries] = useState([])
            useEffect(()=>{
                setDates(getDates());
                if(limit !== undefined)return;
                if(!data)return;
                const accesses = [...data];
                // accesses.reverse();
                const entries = [];
                for(let i=0; i<accesses.length;i++){
                    if(!accesses[i].key.owner)continue;
                    if(!entries.find(e=>e.owner===accesses[i].key.owner))entries.push({owner: accesses[i].key.owner, dates:[]})
                    const entry = entries.find(e=>e.owner===accesses[i].key.owner)
                    const accessDate = new Date(accesses[i].time);
                    const entryDateIndex = entry.dates.findIndex(entryDate=>(
                        entryDate.getFullYear() === accessDate.getFullYear() &&
                        entryDate.getMonth() === accessDate.getMonth() &&
                        entryDate.getDate() === accessDate.getDate()
                    ))
                    if(accessDate.getHours()>=0 && accessDate.getHours()<=5)continue;
                    if(accessDate.getHours()>=18 && accessDate.getHours()<=23)continue;
                    if(entryDateIndex < 0){
                        entry.dates.push(new Date(accessDate.getTime()));
                        continue;
                    }
                    if(accessDate.getTime() < entry.dates[entryDateIndex].getTime()){
                        entry.dates[entryDateIndex] = new Date(accessDate.getTime())
                        continue;
                    }
                }
                setEntries(entries);
                console.log("ENTRIES ", entries);
            }, [data])

            function getDates(){
                const dates = [];
                if(filter.startDate.getFullYear()!=filter.startDate.getFullYear())return;
                let date = new Date(filter.startDate.getFullYear(), filter.startDate.getMonth(), filter.startDate.getDate());
                let count = Math.floor((filter.endDate.getTime() - filter.startDate.getTime())/(1000*60*60*24));
                for(let day=0; day<=count; day++){
                    dates.push(new Date(date))
                    date.setDate(date.getDate()+1);
                }
                return dates;
            }
            if(!data)return <h1 className="title">Загрузка...</h1>
            return (
                <>
                    <h1 className="subtitle">Учёт рабочего времени</h1>
                    <Calendar range startDate={filter.startDate} endDate={filter.endDate} onChange={setDateRange}/>
                    <hr/>              
                    {(!filter.startDate || !filter.endDate)?
                        <h1 className="subtitle mt-2 has-text-danger">Необходимо выбрать временной интервал</h1>
                        :<div style={{display:'flex'}}>
                            <table style={{width:'auto', flexShrink:0}} className="table">
                                <tbody>
                                    <tr>
                                            <th>Сотрудник</th>
                                    </tr>
                                    {entries.map((entry, i)=>(
                                        <tr key={i}>
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
                                        {entries.map((entry, i)=>(
                                            <tr key={i}>
                                                {dates.map((date,i)=>{
                                                    const entryDate = entry.dates.find(entryDate=>(
                                                        entryDate.getFullYear() === date.getFullYear() &&
                                                        entryDate.getMonth() === date.getMonth() &&
                                                        entryDate.getDate() === date.getDate()
                                                    ))
                                                    if(!entryDate)return <td className="has-text-grey-light">x</td>
                                                    return <td className={entryDate.getHours()<startWorkTime?'has-background-success has-text-white':'has-background-danger has-text-white'}>{`${addZero(entryDate.getHours())}:${addZero(entryDate.getMinutes())}`}</td>
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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