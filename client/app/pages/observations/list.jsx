import React from 'react'
import Observation from './item';
import Top from './top';
import Pages from '../../components/pagination';

export default ({data=[], filter={}, count, setSkip, setDateRange})=>{
            return (
                <>
                    <div className="title">Нарушения</div>
                    <Top filter={filter} setDateRange={setDateRange}/>
                    <div className="mt-4">
                        {data && data.map((o,i)=>(
                                <Observation observation={o} key={o._id} index={i}/>
                            ))}
                    </div>
                    <Pages count={count} limit={filter.limit} skip={filter.skip} setSkip={setSkip}/>
                </>
            )
        }