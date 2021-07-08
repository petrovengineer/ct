import React, {useState} from "react"
import IamStore from '../store/iam.js'

const Reg = ()=>{
    const [name, setName] = useState('Иванов Иван Иванович')
    const [email, setEmail] = useState('ivanov@mail.ru')
    const [password, setPassword] = useState('1212')
    const [password2, setPassword2] = useState('1212')
    return (
        <>
            <div class="field">
                <p class="control">
                    <input class="input is-static" type="email" value="Фамилия Имя Отчество (полностью)" readonly/>
                </p>
                <p class="control has-icons-right">
                    <input class="input" type="email" 
                    value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <input class="input is-static" type="email" value="Адрес электронной почты" readonly/>
                </p>
                <p class="control has-icons-right">
                    <input class="input" type="email"
                    value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <input class="input is-static" type="email" value="Пароль" readonly/>
                </p>
                <p class="control ">
                    <input class="input" type="password"
                    value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <input class="input is-static" type="email" value="Повторите пароль" readonly/>
                </p>
                <p class="control ">
                    <input class="input" type="password"
                    value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-info" onClick={()=>{IamStore.reg({name, email, password})}}>
                        Зарегистрироваться
                    </button>
                </p>
            </div>
        </>
    )
}

export default Reg