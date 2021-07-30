import React, {useEffect} from 'react'
import api from '_app/api'
import Store from '_store/reports'
import {observer} from 'mobx-react'

const withReports = (Children) => {
    return observer((props)=>{
        const {loading, error, reports, filter} = Store;
        useEffect(async ()=>{
            try{
                if(!reports){
                    Store.setLoading(true)
                    const data = await api("query reports($filter: FilterType){reports(filter: $filter){_id observations{_id text} created author{_id name}}}"
                    ,{filter})
                    Store.setReports(data.reports)
                }
            }
            catch(e){
                Store.setError('Server error: ', e)
            }
            finally{
                Store.setLoading(false)
            }
        },[])
            return <Children data={reports} loading={loading} error={error} {...props}/>
        })
}

export default withReports