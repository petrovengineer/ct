import { observer } from 'mobx-react'
import React, {useEffect} from 'react'
import Store from '_store/base'

const WithAccess = ({children})=>{
    const {data, filter, setDateRange, setSkip, count} = Store;
    useEffect(()=>{
        if(!Store.data)Store.fetch();
    }, [])
    return children({data, filter, setDateRange, setSkip, count})
}

export default observer(WithAccess)