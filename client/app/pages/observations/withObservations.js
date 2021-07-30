import React, { useEffect } from 'react'
import { observer } from "mobx-react"
import store from '_store/observations'
import api from '_app/api';

export default (Children)=>{
    return class EnhancedObservations extends React.Component{
        constructor(props){
            super(props)
            console.log("PROPS ", this.props)
        }
        async fetchData(){
            try{
                store.setLoading(true)
                console.log("FETCH FROM SERVER");
                const {observations:data} = await api("query observations($filter: FilterType){observations(filter: $filter){observations{_id text time photos author{_id name}} count}}", 
                {filter: store.filter})
                store.setObservations(data.observations, data.count)
            }
            catch(e){store.setError('Server error!'); console.log(e)}
            finally{store.setLoading(false)}
        }
        componentDidMount(){
            console.log("MOUNT ", this.props.observations);
            if(!this.props.observations)this.fetchData();
        }
        componentDidUpdate(prevProps){
            console.log("UPDATE")
            if(prevProps.refresh!==this.props.refresh)this.fetchData();
        }
        render(){
            return <Children {...this.props}/>
        }
    }
}

// return observer((props)=>{
//     const {filter} = store;
//     async function fetchData(){
//         try{
//             const {observations:data} = await api("query observations($filter: FilterType){observations(filter: $filter){observations{_id text time photos author{_id name}} count}}", 
//             {filter: store.filter})
//             console.log("SERVER RESPONSE", data)
//             store.setObservations(data.observations, data.count)
//         }
//         catch(e){store.setError('Server error!'); console.log(e)}
//         finally{store.setLoading(false)}
//     }
//     useEffect(()=>{
//         console.log("123")
//         if(!store.observations){fetchData();console.log("FIRST ");}
//     }, [])
//     useEffect(()=>{
//         // if(!store.observations)console.log("FILTER")
//         if(store.refresh){fetchData();console.log("REFRESH ");}
//     },[store.refresh])
//     return <Children 
//            {...props} 
//             loading={store.loading} 
//             data={store.observations} 
//             count={store.count} 
//             filter={store.filter}
//             setSkip={store.setSkip}
//         />
// })