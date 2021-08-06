import React, {useState} from 'react'
import Dates from '_components/dates-range'
import {formatDate} from '_app/time'
import store from '_store/reports'
import ru from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker'

export default ({filter, setDateRange, data=[]})=>{
    const [checkList, setCheckList] = useState([])
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
        const fullList = checkList.map(_id=>(data.find(o=>o._id===_id)))
        store.create(fullList);
    }
    return (
        <div className="box">
            <div className="subtitle">
                Новый отчёт
            </div>
            <div className="field">
                <Dates filter={filter} setDateRange={setDateRange}/>
            </div>
            <div className="field">
                {data.map((item)=>(
                    <div>
                        <label className="checkbox" key={item._id} >
                            <input type="checkbox" checked={checkList.indexOf(item._id)>=0} onChange={()=>handleChange(item._id)}/>
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