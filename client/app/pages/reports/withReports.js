import React, {useEffect} from 'react'
import api from '_app/api'
import Store from '_store/reports'
import {observer} from 'mobx-react'

const withReports = observer(()=>{
    useEffect(async ()=>{
        try{
            Store.setLoading(true)
            const {reports} = await api("query reports($filter: FilterType){reports(filter: $filter){_id observations{_id text} created author{_id name}}}", 
            {filter: this.filter})
            Store.setReports(reports)
        }
        catch(e){
            Store.setError('Server error: ', e)
        }
        finally{
            Store.setLoading(false)
        }
    },[])
    return {reports, error, loading}
})

export default withReports