import React, {useState} from "react"
import IamStore from '../store/iam.js'

const Login = ()=>{
    const [email, setEmail] = useState('petrovengineer@gmail.com')
    const [password, setPassword] = useState('1212')
    return (
        <>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Email" 
                    value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input" type="password" placeholder="Password" 
                    value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                    </span>
                </p>
                </div>
                <div className="field">
                <p className="control">
                    <button className="button is-success" onClick={()=>{IamStore.login(email, password)}}>
                        Войти
                    </button>
                </p>
            </div>
        </>
    )
}

export default Login