import {action, makeAutoObservable, configure  } from 'mobx'
import api from '../api';

class Iam {
    iam = null;
    isLoading = false;
    successReg = false;
    constructor() {
        makeAutoObservable(this)
    }
    login = (email, password) => {
        this.isLoading = true;
        const query = "mutation login($email: String!, $password: String){login(email: $email, password: $password) {accessToken}}";
        const variables = {email, password}
        api(query, variables)
        .then(action((data)=>{
            if(data.login.accessToken){
                localStorage.setItem('token', data.login.accessToken)
                this.whoAmI()
            }
        }))
        .catch((e)=>{})
        .finally(action(()=>{this.isLoading = false}))
    }
    reg = ({name = "Новый", email, password})=>{
        this.isLoading = true;
        const query = "mutation reg($name: String, $email: String!, $password: String){reg(name: $name, email: $email, password: $password) {accessToken}}";
        const variables = {name, email, password}
        api(query, variables)
        .then(action((data)=>{
            if(data.reg.accessToken){
                localStorage.setItem('token', data.reg.accessToken)
                this.whoAmI()
            }
        }))
        .catch((e)=>{})
        .finally(action(()=>{this.isLoading = false}))
    }
    exit = ()=>{
        localStorage.removeItem('token');
        this.iam = null;
    }
    whoAmI = () => {
            api("query{user{name}}")
            .then(action((data)=>{
                this.iam = data.user;
            }))
        }
    }


const IamStore = new Iam()
export default IamStore