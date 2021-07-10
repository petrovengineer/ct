import React, {useState} from "react"
import IamStore from '../../store/iam.js'

const Reg = ()=>{
    const [name, setName] = useState('Иванов Иван Иванович')
    const [email, setEmail] = useState('ivanov@mail.ru')
    const [password, setPassword] = useState('1212')
    const [password2, setPassword2] = useState('1212')
    return (
        <>
            <div className="field">
                <p className="control">
                    <input className="input is-static" type="email" value="Фамилия Имя Отчество (полностью)" readOnly/>
                </p>
                <p className="control has-icons-right">
                    <input className="input" type="email" 
                    value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <input className="input is-static" type="email" value="Адрес электронной почты" readOnly/>
                </p>
                <p className="control has-icons-right">
                    <input className="input" type="email"
                    value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <input className="input is-static" type="email" value="Пароль" readOnly/>
                </p>
                <p className="control ">
                    <input className="input" type="password"
                    value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <input className="input is-static" type="email" value="Повторите пароль" readOnly/>
                </p>
                <p className="control ">
                    <input className="input" type="password"
                    value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <button className="button is-info" onClick={()=>{IamStore.reg({name, email, password})}}>
                        Зарегистрироваться
                    </button>
                </p>
            </div>
        </>
    )
}

export default Reg