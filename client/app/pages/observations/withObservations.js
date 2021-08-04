import React, { useEffect, useContext } from 'react'
import { observer } from "mobx-react"
import StoreContext from '_app/storeContext'

export default (Children)=>{
    return observer((props)=>{
    const {observationsStore:store} = useContext(StoreContext);
    useEffect(()=>{
        // if(!store.data){
            store.fetchData();
        // }
    }, [])
    return <Children 
           {...props} 
            loading={store.loading} 
            data={store.data} 
            count={store.count} 
            filter={store.filter}
            setSkip={store.setSkip}
        />
})
}