import React, { useEffect } from 'react'
import Observation from './observation';
import store from '../../store/observations'
import {observer} from 'mobx-react'
import TopBar from './top';
import Pages from '../../components/pagination';
import withObservations from './withObservations'

const Observations = withObservations((props)=>{
    const {loading, observations=[], count, filter={}, setSkip} = store;
    if(loading)return <div className="subtitle">Loading...</div>
    return (
        <>
            <TopBar/>
            <div className="mt-4">
                {observations.map((o,i)=>(
                    <Observation observation={o} key={o._id} index={i}/>
                ))}
            </div>
            <Pages count={count} limit={filter.limit} skip={filter.skip} setSkip={setSkip}/>
        </>
    )
})
// const Observations = observer(()=>{
//     const {observations = [], isLoading, count, filter:{limit, skip}, setSkip, fetchData} = OStore;
//     useEffect(async ()=>{
//         fetchData();
//     },[])
//     if(isLoading)return 'Loading...'
//     return (
//         <>
//             <TopBar/>
//             <div className="mt-4">
//                 {observations.map((o,i)=>(
//                     <Observation observation={o} key={o._id} index={i}/>
//                 ))}
//             </div>
//             <Pages count={count} limit={limit} skip={skip} setSkip={setSkip}/>
//         </>
//     )
// })

export default Observations;