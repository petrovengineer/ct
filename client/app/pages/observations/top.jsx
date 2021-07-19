import React, { useState } from 'react'
import New from '_components/new'
import ObservationsStore from '_store/observations'
import Dates from './dates';

const TopBar = ()=>{
    const [newForm, showNewForm] = useState(false);
    const {createObservation} = ObservationsStore;
    const onCreate = (...args)=>{
        createObservation(...args);
        showNewForm(false);
    }
    return (
        <nav className="top">
            <div className="top-start">
                <button className="button is-link" onClick={()=>{showNewForm(true)}}>Добавить</button>
            </div>
            <div className="top-end">
                <Dates/>
            </div>
            {newForm && <New close={()=>{showNewForm(false)}} title={'Описание нарушения:'} onCreate={onCreate}/>}
        </nav>
    )
}

export default TopBar