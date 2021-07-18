import React from 'react'

const hours = []
const minutes = []
for(let i=0; i<=23; i++){hours.push(i<10?"0"+i:i.toString())}
for(let i=0; i<=59; i++){minutes.push(i<10?"0"+i:i.toString())}

const TimeInput = ({ value, onChange }) => {
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

export default TimeInput