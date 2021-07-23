import React, {useEffect} from 'react'
import withReports from './withReports'

const Reports = ()=>{
    const {reports, error, loading} = Store;

    const {loading = false, error = null, reports = []} = withReports()
    if(loading) return <h1 className="title has-text-primary">Loading...</h1>
    if(error) return <h1 className="title has-text-danger">Error:(</h1>
    return (
        <div>
            {/* {reports.map(r=>(
                <div key={r._id}>{r.author.name}</div>
            ))} */}
        </div>
    )
}

export default Reports