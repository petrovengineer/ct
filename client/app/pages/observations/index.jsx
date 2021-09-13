import React, { useEffect } from 'react'
import WithObservations from '_hoc/WithObservations'
import Observation from './item';
import Top from './top';
import Pages from '_components/pagination';

function filter(filter){
    return {startDate:new Date(0), endDate: new Date(), limit: 10}
}

export default function Observations(){
    return <WithObservations filter={filter}>
                {({data=[], filter={}, count, setSkip, setDateRange})=>{
                    return (
                        <>
                            <div className="subtitle">Оперативный журнал</div>
                            <Top filter={filter} setDateRange={setDateRange}/>
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