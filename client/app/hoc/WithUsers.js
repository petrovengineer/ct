import { observer } from 'mobx-react'
import React, {useEffect} from 'react'
import Store from '_store/users'

const WithUsers = ({children})=>{
    useEffect(()=>{
        if(!Store.data)
        Store.fetch();
    }, [])
    return children(Store)
}

export default observer(WithUsers)