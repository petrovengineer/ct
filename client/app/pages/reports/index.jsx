import React, {useEffect} from 'react'
import withReports from './withReports'
import New from '_components/new'

export default withReports(({loading, error, data})=>{
    if(loading)return <div className="subtitle">Loading...</div>
    if(error)return <div className="subtitle">Error:(</div>
    return (
        <>
            <div className="title">Отчёты</div>
            
        </>
    )
})