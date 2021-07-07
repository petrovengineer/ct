import React, { useState } from 'react'
import { observer } from 'mobx-react'
import IamStore from '../store/iam.js'

const Login = observer(()=>{
    const [email, setEmail] = useState('petrovengineer@gmail.com')
    const [password, setPassword] = useState('1212')
    return (
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div className="box" style={{margin:'10px'}}>
                <h1 className="title">Login</h1>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="Email" 
                        value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="password" placeholder="Password" 
                        value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control">
                        <button class="button is-success" onClick={()=>{IamStore.login(email, password)}}>
                        Login
                        </button>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Login;