import React, { useEffect } from 'react'
import Observation from './observation';
import OStore from '../../store/observations'
import {observer} from 'mobx-react'
import TopBar from './top';
import Pages from '../../components/pagination';

const Observations = observer(()=>{
    const {observations, isLoading, count, filter:{limit, skip}, setSkip, fetchData} = OStore;
    useEffect(async ()=>{
        fetchData();
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
            <Pages count={count} limit={limit} skip={skip} setSkip={setSkip}/>
        </>
    )
})

export default Observations;