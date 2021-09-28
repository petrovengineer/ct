import React, { useState } from 'react'
import New from './new'
// import store from '_store/_observations'
import Calendar from '_components/calendar'
import { observer } from 'mobx-react'
import store from '_entities/Observations/store'

const Top = ()=>{
    const {filter:{startDate, endDate}, updateFilter, get} = store;
    const [newForm, showNewForm] = useState(false);
    const onCreate = (...args)=>{
        store.create(...args);
        showNewForm(false);
    }
    function onChange(startDate, endDate){
        if(endDate!=null)endDate.setHours(23,59,59,999);
        updateFilter(()=>({
            startDate: new Date(startDate.getTime()),
            endDate: endDate?new Date(endDate.getTime()):null,
            skip: endDate?0:undefined
        }))
        if(endDate!=null)get()
    }
    return (
        <nav>
            <div className="field">
                <button className="button is-success" onClick={()=>{showNewForm(true)}}>Добавить</button>
            </div>
            <div className="field">
                <Calendar startDate={startDate} endDate={endDate} onChange={onChange} range/>
            </div>
            {newForm && <New close={()=>{showNewForm(false)}} title={'Описание нарушения:'} onCreate={onCreate}/>}
        </nav>
    )
}

export default observer(Top)