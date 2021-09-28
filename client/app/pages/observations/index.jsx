import React, { useEffect } from 'react'
import Observation from './item';
import Top from './top';
import Pages from '_components/pagination';
import store from '_entities/Observations/store'
import {observer} from "mobx-react";

export default observer(function Observations(){
        const {cachedData:data, filter, count, updateFilter, get} = store;
        return (
            <>
                {/*<div className="subtitle">Оперативный журнал</div>*/}
                <Top/>
                <div className="mt-4">
                    {data && data.map((o,i)=>(
                            <Observation observation={o} key={o._id} index={i}/>
                        ))}
                </div>
                <Pages count={count} limit={filter.limit} skip={filter.skip} updateFilter={updateFilter} get={get}/>
            </>
        )
})