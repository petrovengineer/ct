import React from 'react'

const Modal = ({close, children, contentStyle})=>(
    <div className="modal is-active">
        <div className="modal-background" onClick={close}></div>
        <div className="modal-content" style={contentStyle}>
            {children}
        </div>
        <button className="modal-close is-large" aria-label="close"
            onClick={close}
        ></button>
    </div>
)

export default Modal;