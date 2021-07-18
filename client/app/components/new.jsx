import React, { useState } from 'react'
import Modal from './modal'
import {action} from 'mobx'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru';
import TimeInput from '_components/time-input'

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
                    <label className="label">Дата и время:</label>
                    <div className="control">
                        <DatePicker
                            dateFormat="dd.MM.yyyy HH:mm"
                            className="date-peacker-custom-input"
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)}
                            showTimeInput
                            customTimeInput={<TimeInput />}
                            withPortal
                            disabledKeyboardNavigation
                            shouldCloseOnSelect={true}
                            timeInputLabel=""
                            locale={ru}
                            showMonthDropdown
                            // openToDate={new Date("1993/09/28")}
                        />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={action(()=>onCreate(text, startDate.toISOString()))}>Создать</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}



export default NewBreakdown