import React, { useEffect, useState } from 'react'

import {dayList, monthList, monthListDec} from '_app/time'

const s = {
    cell:{width: '30px', height:'30px', paddingTop: '2px', display:'inline-block', textAlign:'center', cursor:'pointer', marginTop:'5px'}
}

export default ({onChange, startDate, endDate, range})=>{
    const [date, setDate] = useState(new Date())
    const [calendar, showCalendar] = useState(false)
    const [select, setSelect] = useState(0)
    function getDays(){
        const days = [];
        let count = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        for(let d=1; d<=count; d++){
            days.push(d);
        }
        return days;
    }
    function getOffset(){
        const days = [];
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
        let count = firstDay-1;
        if(firstDay===0)count = 6;
        for(let d=1; d<=count; d++){
            days.push(d);
        }
        return days;
    }
    function compareDates(firstDate, secondDate){
        const first = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate())
        const second = new Date(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate())
        if(first.getTime()===second.getTime())return true;
        return false;
    }
    function handleClick(d){
        const newDate = new Date(date.getFullYear(), date.getMonth(), d)
        if(!range){
            showCalendar(false)
            onChange(newDate);
            return;
        }
        if(select===0){
            onChange([newDate, null]);
            setSelect(1)
            return;
        }
        if(select===1){
            setSelect(0)
            onChange([startDate, newDate]);
            setTimeout(()=>{showCalendar(false);},1000) 
            return;
        }
    }
    function ceilClass(d){
        let ceilClass = "";
        let currentDate = new Date(date.getFullYear(), date.getMonth(), d);
        if(compareDates(startDate, currentDate))ceilClass +=" has-background-link has-text-white";
        if(!endDate)return ceilClass;
        if(compareDates(endDate, currentDate))ceilClass +=" has-background-link has-text-white";
        if((currentDate.getTime()>startDate.getTime()) && (currentDate.getTime()<new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime()))ceilClass +=" has-background-success has-text-white";
        return ceilClass;
    }
    return (
        <>
            <div style={{width:'235px', border: '1px solid gray', padding:'5px', cursor: 'pointer'}} onClick={()=>showCalendar(!calendar)}>
                {startDate.getDate()} {monthListDec[startDate.getMonth()]} {(range && endDate)&& <> - {endDate.getDate()} {monthListDec[endDate.getMonth()]} {endDate.getFullYear()}</>}
            </div>
            {calendar && <div style={{width:'235px', border: '1px solid gray', padding:'10px'}} >
                <div>
                    <a onClick={()=>{setDate(new Date(date.getFullYear(), date.getMonth()-1))}}>{"<"}</a>
                    <span className="mr-1 ml-1">{monthList[date.getMonth()]}</span>
                    <span className="mr-1">{date.getFullYear()}</span>
                    <a onClick={()=>{setDate(new Date(date.getFullYear(), date.getMonth()+1))}}>{">"}</a>
                </div>
                <div>
                    {dayList.map((d,i)=>(<div style={s.cell}>{d}</div>))}
                </div>
                <div>
                    {getDays().map((d, i)=>(
                        <>
                            {(i===0)&&(getOffset().map((o,i)=>(<div style={{width: '30px', display:'inline-block'}}></div>)))}
                            <div style={s.cell}
                                onClick={()=>handleClick(d)}
                                className={ceilClass(d)}
                            >
                                {d}
                            </div>
                            {(new Date(date.getFullYear(), date.getMonth(), d).getDay()===0) && <br/>}
                        </>
                    ))}
                </div>
            </div>}
        </>
    )
}

