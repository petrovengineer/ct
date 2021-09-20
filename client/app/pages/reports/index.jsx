import React, {useEffect, useState} from 'react'
import Modal from '_components/modal'
import WithReports from './withReports'
// import WithObservations from '../observations/withObservations'
import newReport from './new-report'
import store from '_store/reports'
import ObsStore from '_store/_observations'
import { observer } from 'mobx-react'
import Calendar from '_components/calendar'
import { saveAs } from "file-saver";
import createDoc from '../../custom/report-generator'
import WithObservations from '_hoc/WithObservations'

export default function Reports(){
    return (
        <WithReports >
            {function({data: reports}){
                const [showNewReport, setShowNewReport] = useState(false)
                const [date, setDate] = useState(new Date())
                async function generate(observations){
                    try{
                        if(!observations || !Array.isArray(observations) || observations.length===0)return;
                        ObsStore.setId(observations.map(o=>o._id))
                        const payload = await new Promise(done=>ObsStore.fetch(done))
                        console.log("PAYLOAD OBS ", payload)
                        const buf = await new Promise(done=>createDoc({observations: payload.data}, done))
                        saveAs(new Blob([buf]), "example.docx");
                    }catch(e){
                        console.log("ERROR ", e)
                    }
                }
                function daysBefore(date, days){
                    return new Date(date.getTime()-days*24*60*60*1000)
                }
                function handleOpenNewReport(){
                    setShowNewReport(true)
                }
                if(!reports)return <div className="title">Загрузка...</div>
                return <>
                            <div className="title">Отчёты 
                                <button className="button is-link" onClick={handleOpenNewReport}>Добавить</button>
                            </div>
                            <Calendar startDate={date} onChange={d => setStartDate(d)}/>
                            {reports.map(report=>{
                                return (
                                <div className="field" key={report._id}>
                                    <div className="box">
                                        {report.observations.map(o=>(
                                            <div className="field">
                                                {o.text}
                                            </div>
                                        ))}
                                        <div className="block">
                                            <button className="button" onClick={()=>generate(report.observations)}>Скачать</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            )}
                            {showNewReport && 
                                <Modal close={()=>setShowNewReport(false)}>
                                    <WithObservations filter={()=>({startDate: daysBefore(new Date(),1), endDate:new Date(), limit: null})}>
                                        {newReport}
                                    </WithObservations>
                                </Modal>
                            }
                        </>
            }}
        </WithReports>
    )
}

// export default observer(()=>{
//     const {data:reports=[]} = store;
//     const [showNewReport, setShowNewReport] = useState(false)
//     const [startDate, setStartDate] = useState(new Date())
//     useEffect(()=>{
//         store.fetchData();
//     }, [])
//     async function generate(observations){
//         try{
//             if(!observations || !Array.isArray(observations) || observations.length===0)return;
//             ObsStore.setId(observations.map(o=>o._id))
//             const payload = await new Promise(done=>ObsStore.fetch(done))
//             console.log("PAYLOAD OBS ", payload)
//             const buf = await new Promise(done=>createDoc({observations: payload.data}, done))
//             saveAs(new Blob([buf]), "example.docx");
//         }catch(e){
//             console.log("ERROR ", e)
//         }
//     }
//     function handleOpenNewReport(){
//         ObsStore.prepareForReport()
//         setShowNewReport(true)
//     }
//     return (
//         <>
//             <div className="title">Отчёты 
//                 <button className="button is-link" onClick={handleOpenNewReport}>Добавить</button>
//             </div>
//             <Calendar 
//                 startDate={startDate}
//                 onChange={(date) => {
//                     setStartDate(date);
//                 }}
//             />
//             {showNewReport && 
//                 <Modal close={()=>setShowNewReport(false)}>
//                     <WithObservations>
//                         {newReport}
//                     </WithObservations>
//                 </Modal>
//             }
//             {reports.map(report=>{
//                 return (
//                 <div className="field">
//                     <div className="box">
//                         {report.observations.map(o=>(
//                             <div className="field">
//                                 {o.text}
//                             </div>
//                         ))}
//                         <div className="block">
//                             <button className="button" onClick={()=>generate(report.observations)}>Скачать</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             )}
//         </>
//     )
// })