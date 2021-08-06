import React, {useEffect, useState} from 'react'
import Modal from '_components/modal'
import WithReports from './withReports'
import WithObservations from '../observations/withObservations'
import newReport from './new-report'
import store from '_store/reports'
import { observer } from 'mobx-react'


export default observer(()=>{
    // if(loading)return <div className="subtitle">Loading...</div>
    // if(error)return <div className="subtitle">Error:(</div>
    const {data=[]} = store;
    const [showNewReport, setShowNewReport] = useState(false)
    useEffect(()=>{
        store.fetchData();
    }, [])
    useEffect(()=>{
        console.log("EFFECT ", data)
    }, [data])
    return (
        <>
            <div className="title">Отчёты</div>
            <button className="button is-link" onClick={()=>{setShowNewReport(true)}}>Добавить</button>
            {showNewReport && 
                <Modal close={()=>setShowNewReport(false)}>
                    <WithObservations>
                        {newReport}
                    </WithObservations>
                </Modal>
            }
            {data.map(report=>(
                <div className="field">
                    {report.observations.map(o=>(o.text))}
                </div>
            ))}
        </>
    )
})