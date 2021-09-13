import React, { useState } from 'react'
import New from './new'
import store from '_store/_observations'
import Calendar from '_components/calendar'

const Top = ({filter, setDateRange})=>{
    const [newForm, showNewForm] = useState(false);
    const onCreate = (...args)=>{
        store.create(...args);
        showNewForm(false);
    }
    return (
        <nav>
            <div className="block">
                <button className="button is-success" onClick={()=>{showNewForm(true)}}>Добавить</button>
            </div>
            <div className="block">
                <Calendar startDate={filter.startDate} endDate={filter.endDate} onChange={setDateRange} range/>
            </div>
            {newForm && <New close={()=>{showNewForm(false)}} title={'Описание нарушения:'} onCreate={onCreate}/>}
        </nav>
    )
}

export default Top