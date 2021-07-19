import React, { useEffect } from 'react'
import Observation from './observation';
import OStore from '../../store/observations'
import {observer} from 'mobx-react'
import TopBar from './top';
import Pages from '../../components/pagination';
import {action} from 'mobx';

const Observations = observer(()=>{
    const {observations, getObservations, isLoading, count, limit, skip, setSkip} = OStore;
    useEffect(()=>{
        getObservations();
    },[])
    if(isLoading)return 'Loading...'
    return (
        <>
            <TopBar/>
            <div className="mt-4">
                {observations.map((o,i)=>(
                    <Observation observation={o} key={o._id} index={i}/>
                ))}
            </div>
            <Pages count={count} limit={limit} skip={skip} setSkip={action(()=>setSkip)}/>
        </>
    )
})

export default Observations;