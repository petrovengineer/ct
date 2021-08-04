import React, { useEffect } from 'react'
import Observation from './observation';
import Top from './top';
import Pages from '../../components/pagination';
import withObservations from './withObservations'

const Observations = withObservations((props)=>{
    const {loading, data, count, filter={}, setSkip, error} = props;
    if(loading)return <div className="subtitle">Loading...</div>
    if(error)return <div className="subtitle has-text-danger">error</div>
    return (
        <>
            <div className="title">Нарушения</div>
            <Top/>
            <div className="mt-4">
                {data && data.map((o,i)=>(
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