import React, { useState } from 'react'
import New from '_components/new'
import ObservationsStore from '_store/observations'

const TopBar = ()=>{
    const [newForm, showNewForm] = useState(false);
    const {createObservation} = ObservationsStore;
    const onCreate = (...args)=>{
        createObservation(...args);
        showNewForm(false);
    }
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div>
                <div className="navbar-start">
                    <button className="button is-link" onClick={()=>{showNewForm(true)}}>Добавить</button>
                </div>
                <div className="navbar-end"></div>
            </div>
            {newForm && <New close={()=>{showNewForm(false)}} title={'Описание нарушения:'} onCreate={onCreate}/>}
        </nav>
    )
}

export default TopBar