import React, { useEffect } from 'react'
import Observation from './observation';
import OStore from '../../store/observations'
import {observer} from 'mobx-react'
import TopBar from './top';

const Observations = observer(()=>{
    const {observations, getObservations, isLoading} = OStore;
    useEffect(()=>{
        getObservations();
    },[])
    if(isLoading)return 'Loading...'
    return (
        <>
            <TopBar/>
            {observations.map((o,i)=>(
                <Observation observation={o} key={o._id} index={i}/>
            ))}
        </>
    )
})

export default Observations;