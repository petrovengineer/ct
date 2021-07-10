import React from 'react'

const Modal = ({close, children})=>(
    <div className="modal is-active">
        <div className="modal-background" onClick={close}></div>
        <div className="modal-content">
            {children}
        </div>
        <button className="modal-close is-large" aria-label="close"
            onClick={close}
        ></button>
    </div>
)

export default Modal;