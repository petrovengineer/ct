import { observer } from 'mobx-react'
import React, {useEffect} from 'react'
// import Store from '_store/_observations'

class WithBase{
    constructor(store){
        this.store = store;
        console.log("STore ", this.store)

        return this.WithData
    }
    WithData = observer(function WithData({children, filter}){
        useEffect(()=>{
            if(typeof filter === "function")this.store.updateFilter(filter)
            // if(!this.store.data)this.store.fetch()
        }, [])
        return children(this.store)
    })
}

export default WithBase;

// const WithObservations = ({children, filter})=>{
//     useEffect(()=>{
//         if(typeof filter === "function")Store.updateFilter(filter)
//         if(!Store.data)Store.fetch()
//         // if(limit || limit===null)Store.setLimit(limit);
//     }, [])
//     return children(Store)
// }

// export default observer(WithObservations)