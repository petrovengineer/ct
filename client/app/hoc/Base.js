import { observer } from 'mobx-react'
import React, {useEffect} from 'react'
// import Store from '_store/_observations'

class WithBase{
    constructor(store){
        // console.log("STORE ",Store)
        this.store = store;
        // console.log("THIS STORE ",this.store)
        return this.WithData
    }
    WithData = observer(({children, filter})=>{
        useEffect(()=>{
            console.log("BASE WITH ", this.store)
            if(typeof filter === "function")this.store.updateFilter(filter)
            if(!this.store.data)this.store.fetch()
            // if(limit || limit===null)Store.setLimit(limit);
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