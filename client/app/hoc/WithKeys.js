import { observer } from 'mobx-react'
import React, {useEffect} from 'react'
import Store from '_store/keys'

const WithKeys = ({children, limit})=>{
    useEffect(()=>{
        // if(!Store.data)
        if(limit!=undefined)Store.setLimit(limit);
        Store.fetch();
    }, [])
    return children(Store)
}

export default observer(WithKeys)