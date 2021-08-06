import React, { useEffect, useContext } from 'react'
import { observer } from "mobx-react"
// import StoreContext from '_app/storeContext'
import store from '_store/reports'

export default observer(({children})=>{
    // const {observationsStore:store} = useContext(StoreContext);
    useEffect(()=>{
        if(!store.data){
            store.fetchData();
        }
    }, [])
    return children({...store})
})