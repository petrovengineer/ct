// import { observer } from 'mobx-react'
import React, {useEffect} from 'react'
import WithBase from '_hoc/Base'
import Store from '_store/_observations'

export default new WithBase(Store) 

// const WithObservations = ({children, filter})=>{
//     useEffect(()=>{
//         if(typeof filter === "function")Store.updateFilter(filter)
//         if(!Store.data)Store.fetch()
//         // if(limit || limit===null)Store.setLimit(limit);
//     }, [])
//     return children(Store)
// }

// export default observer(WithObservations)