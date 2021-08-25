import { observer } from 'mobx-react'
import React, {useEffect, useMemo, useCallback} from 'react'
import Store from '_store/access'

const WithAccess = ({children, limit})=>{
    useEffect(()=>{
        let oldLimit = Store.filter.limit;
        Store.setLimit(limit);
        if(!Store.data || oldLimit!==limit)Store.fetch();
    }, [])
    return children(Store)
}

export default observer(WithAccess)