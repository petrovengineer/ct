import React, { useEffect } from 'react'
import Observation from './observation';
import OStore from '../../store/observations'
import {observer} from 'mobx-react'

const Observations = observer(()=>{
    const {observations, getObservations, isLoading} = OStore;
    useEffect(()=>{
        getObservations();
    },[])
    if(isLoading)return 'Loading...'
    return (
        <>
            <h1 className="title">Наблюдения</h1>
            {observations.map(o=>(
                <Observation observation={o} key={o._id}/>
            ))}
        </>
    )
})

export default Observations;