import React from 'react'
import Breakdown from './breakdown';
import TopBar from './top'

const Breakdowns = ()=>{
    return (
        <>
            <TopBar/>
            {breakdowns.map(b=>(
                <Breakdown breakdown={b} key={b._id}/>
            ))}
        </>
    )
}

export default Breakdowns;

const breakdowns = [
    {_id:'1'},
]