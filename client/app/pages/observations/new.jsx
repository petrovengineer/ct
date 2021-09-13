import React, { useState } from 'react'
import Modal from '_components/modal'
import {action} from 'mobx'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru';
import TimeInput from '_components/time-input'
import Calendar from '_components/calendar'

const NewBreakdown = ({close, title, onCreate})=>{
    const [text, setText] = useState('Неисправность датчика')
    const [startDate, setStartDate] = useState(new Date())
    return (
        <Modal close={close} contentStyle={{overflow:'visible'}}>
            <div className="box">
                <div className="field">
                    <label className="label">{title}</label>
                    <div className="control">
                        <input className="input" type="text" value={text} onChange={e=>setText(e.target.value)}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Дата:</label>
                    <div className="control">
                        <Calendar startDate={startDate} onChange={(date) => setStartDate(date)}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Время:</label>
                    <div className="control">
                        <TimeInput time={startDate} onChange={setStartDate}/>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={()=>onCreate({text, time: startDate.toISOString()})}>Создать</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}



export default NewBreakdown