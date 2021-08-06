import React, {useEffect, useState} from 'react'
import Modal from '_components/modal'
import WithReports from './withReports'
import WithObservations from '../observations/withObservations'
import newReport from './new-report'
import store from '_store/reports'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru';

export default observer(()=>{
    // if(loading)return <div className="subtitle">Loading...</div>
    // if(error)return <div className="subtitle">Error:(</div>
    const {data=[]} = store;
    const [showNewReport, setShowNewReport] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    useEffect(()=>{
        store.fetchData();
    }, [])
    useEffect(()=>{
        console.log("EFFECT ", data)
    }, [data])
    return (
        <>
            
            <div className="title">Отчёты <button className="button is-link" onClick={()=>{setShowNewReport(true)}}>Добавить</button></div>
            <DatePicker
                dateFormat="dd.MM.yyyy"
                className="date-peacker-custom-input"
                startDate={startDate}
                onChange={(date) => {
                    setStartDate(date);
                }}
                inline
                locale={ru}
                // showMonthDropdown
                openToDate={new Date(new Date().getTime()-24*60*60*1000)}
            />
            {showNewReport && 
                <Modal close={()=>setShowNewReport(false)}>
                    <WithObservations>
                        {newReport}
                    </WithObservations>
                </Modal>
            }
            {data.map(report=>(
                <div className="field">
                    <div className="box">
                        {report.observations.map(o=>(
                            <div className="field">
                                {o.text}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
})