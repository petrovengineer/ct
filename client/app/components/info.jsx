import { observer } from 'mobx-react';
import React from 'react'
import InfoStore from '../store/info'

const Info = observer(()=>{
    const {list, removeMessage} = InfoStore;
    return (
        <>
            {list.map((info, i)=>(
                <div className="modal is-active" key={info.message}>
                    <div className="modal-background" onClick={()=>{removeMessage(i)}}></div>
                    <div className="modal-content">
                        <div className={"panel m-4 " + (info.type === "error"?"is-danger": "")}>
                            <p className="panel-heading">
                                {info.type === "error"?"Ошибка!": undefined}
                            </p>
                            <div className="panel-block" style={{backgroundColor:'white'}}>
                                {info.message}
                            </div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                        onClick={()=>{removeMessage(i)}}
                    ></button>
                </div>
            ))}
        </>
    )
})

export default Info;