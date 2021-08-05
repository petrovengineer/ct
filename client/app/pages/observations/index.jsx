import React, { useEffect } from 'react'
import Observation from './observation';
import Top from './top';
import Pages from '../../components/pagination';
import WithObservations from './withObservations'
import OStore from '_store/observations'
import {observer} from 'mobx-react'

export default ()=>{
    return <WithObservations>
        {({data=[], filter={}, count, setSkip})=>{
            console.log("RENEDER")
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
        }}
    </WithObservations>
}

// const Observations = withObservations((props)=>{
//     const {loading, data, count, filter={}, setSkip, error} = props;
//     if(loading)return <div className="subtitle">Loading...</div>
//     if(error)return <div className="subtitle has-text-danger">error</div>
//     return (
//         <>
//             <div className="title">Нарушения</div>
//             <Top/>
//             <div className="mt-4">
//                 {data && data.map((o,i)=>(
//                     <Observation observation={o} key={o._id} index={i}/>
//                 ))}
//             </div>
//             <Pages count={count} limit={filter.limit} skip={filter.skip} setSkip={setSkip}/>
//         </>
//     )
// })

// const Observations = observer(()=>{
//     const {data = [], loading, count, filter:{limit, skip}, setSkip, fetchData} = OStore;
//     useEffect(async ()=>{
//         fetchData();
//     },[])
//     if(loading)return 'Loading...'
//     return (
//         <>
//             <Top/>
//             <div className="mt-4">
//                 {data.map((o,i)=>(
//                     <Observation observation={o} key={o._id} index={i}/>
//                 ))}
//             </div>
//             <Pages count={count} limit={limit} skip={skip} setSkip={setSkip}/>
//         </>
//     )
// })

// export default Observations;