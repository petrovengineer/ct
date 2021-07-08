import React, { useState } from 'react'
import { observer } from 'mobx-react'
import Login from '../components/login.jsx'
import Reg from '../components/reg.jsx'

const WelcomePage = observer(()=>{
    const [login, showLogin] = useState(true)
    return (
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content" style={{maxHeight:'100vh'}}>
                <div className="box" style={{margin:'10px'}}>
                    <div class="tabs">
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