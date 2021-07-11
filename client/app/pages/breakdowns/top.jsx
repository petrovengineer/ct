import React, { useState } from 'react'
import NewBreakdown from './new'

const TopBar = ()=>{
    const [newB, showNewB] = useState(false);
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div>
                <div className="navbar-start">
                    <button className="button is-link" onClick={()=>{showNewB(true)}}>Добавить</button>
                </div>
                <div className="navbar-end"></div>
            </div>
            {newB && <NewBreakdown close={()=>{showNewB(false)}}/>}
        </nav>
    )
}

export default TopBar