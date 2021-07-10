import React, { useState } from 'react'
import { observer } from 'mobx-react'
import Login from '../components/login.jsx'
import Reg from '../components/reg.jsx'

const WelcomePage = observer(()=>{
    const [login, showLogin] = useState(true)
    return (
        <div className="modal is-active" style={{zIndex:0}}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{maxHeight:'100vh'}}>
                <div className="box" style={{margin:'10px'}}>
                    <div className="tabs">
                        <ul>
                            <li className={login ? "is-active": undefined} 
                                onClick={()=>{showLogin(true)}}>
                                    <a>Вход</a>
                            </li>
                            <li className={(!login ? "is-active": undefined)} 
                                onClick={()=>{showLogin(false)}}>
                                    <a>Регистрация</a>
                            </li>
                        </ul>
                    </div>
                    {login && <Login/>}
                    {!login && <Reg/>}
                </div>
            </div>
        </div>
    )
})

export default WelcomePage;