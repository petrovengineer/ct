import React, { useState } from 'react'
import Modal from './modal'
import {action} from 'mobx'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru';

const hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
const minutes = []
for(let i=0; i<=59; i++){minutes.push(i<10?"0"+i:i.toString())}

const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
const days = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz']

// const locale = {
//   localize: {
//     month: n => months[n],
//     day: n => days[n]
//   },
//   formatLong: {}
// }

const NewBreakdown = ({close, title, onCreate})=>{
    const [text, setText] = useState('Неисправность датчика')
    const [startDate, setStartDate] = useState(new Date())

    const TimeInput = ({ date, value, onChange }) => {
        const hour = value[0]+value[1];
        const minute = value[3]+value[4];
        const onSelectHour = (h)=>{
            onChange(h+":"+minute)
        }
        const onSelectMinute = (m)=>{
            onChange(hour+":"+m)
        }
        return (
        <div style={{display:'flex', alignItems:'center'}}>
            <div className=" mr-2" style={{fontSize:'16px'}}>Время:</div>
            <div class="dropdown is-hoverable mr-2">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{hour}</span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content" style={{maxHeight:'160px', maxWidth:'75px', overflowY: 'scroll', overflowX: 'hidden'}}>
                        {hours.map(h=><a onClick={()=>onSelectHour(h)} class="dropdown-item">{h}</a>)}
                    </div>
                </div>
            </div>
            <div class="dropdown is-hoverable ">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{minute}</span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content" style={{maxHeight:'160px', maxWidth:'75px', overflowY: 'scroll', overflowX: 'hidden'}}>
                        {minutes.map(m=><a onClick={()=>onSelectMinute(m)} class="dropdown-item">{m}</a>)}
                    </div>
                </div>
            </div>
        </div>
      )}

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