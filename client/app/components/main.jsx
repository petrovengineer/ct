import React from 'react'
import s from '../styles/main.module.scss'

export default function({children}){
    return (
        <div id="main" className={s.main}>
            {children}
        </div>
    )
}