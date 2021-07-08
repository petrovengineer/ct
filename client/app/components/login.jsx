import React, {useState} from "react"
import IamStore from '../store/iam.js'

const Login = ()=>{
    const [email, setEmail] = useState('petrovengineer@gmail.com')
    const [password, setPassword] = useState('1212')
    return (
        <>
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
                        Войти
                    </button>
                </p>
            </div>
        </>
    )
}

export default Login