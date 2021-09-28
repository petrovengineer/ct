import React, {useEffect, useState} from 'react'
import Dates from '_components/dates-range'
import {formatDate} from '_app/time'
import reportsStore from '_entities/Reports/store'
import obsStore from '_entities/Observations/store'
import {observer} from "mobx-react";

function NewReport(){
    const [checkList, setCheckList] = useState([])
    const {data:observations} = obsStore;
    useEffect(()=>{
        obsStore.updateFilter(()=>({startDate: daysBefore(new Date(),1), endDate:new Date(), limit: null}))
        obsStore.get()
    }, [])
    function daysBefore(date, days){
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return new Date(date.getTime()-days*24*60*60*1000)
    }
    function handleChange(_id){
        const index = checkList.indexOf(_id)
        if(index<0)setCheckList([...checkList, _id])
        else {
            const newList = [...checkList]
            newList.splice(index, 1)
            setCheckList(newList)
        }

    }
    function createReport(){
        const fullList = checkList
            .map(_id=>(observations.find(o=>o._id===_id)))
            .map(({_id, text, time, photos})=>({_id, text, time, photos}))
        reportsStore.create({observations: fullList});
    }
    return (
        <div className="box">
            <div className="subtitle">
                Новый отчёт
            </div>
            <div className="field">
                {/*<Dates filter={filter} setDateRange={setDateRange}/>*/}
            </div>
            <div className="field">
                {observations && observations.map((item)=>(
                    <div>
                        <label className="checkbox" key={item._id} >
                            <input type="checkbox" checked={checkList.indexOf(item._id)>=0} onChange={()=>handleChange(item._id)} style={{width:'16px', height:'16px'}}/>
                            <span className="mx-2 has-text-link">{formatDate(item.time)}</span>
                            <span>{item.text}</span>
                        </label>
                    </div>
                ))}
            </div>
            <div className="field">

            </div>
            <div className="field">
                <button className="button is-success" onClick={createReport}>Создать</button>
            </div>
        </div>
    )
}

export default observer(NewReport)