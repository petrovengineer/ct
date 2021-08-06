import React, { useState } from 'react'
import New from '_components/new'
import store from '_store/observations'
import Dates from '_components/dates-range';

const Top = ({filter, setDateRange})=>{
    const [newForm, showNewForm] = useState(false);
    const onCreate = (...args)=>{
        store.create(...args);
        showNewForm(false);
    }
    return (
        <nav className="top">
            <div className="top-start">
                <button className="button is-link" onClick={()=>{showNewForm(true)}}>Добавить</button>
            </div>
            <div className="top-end">
                <Dates filter={filter} setDateRange={setDateRange}/>
            </div>
            {newForm && <New close={()=>{showNewForm(false)}} title={'Описание нарушения:'} onCreate={onCreate}/>}
        </nav>
    )
}

export default Top