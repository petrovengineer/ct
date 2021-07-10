import {action, makeAutoObservable} from 'mobx'
import api from '../api';
import InfoStore from './info';

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
            if(data.login && data.login.accessToken){
                localStorage.setItem('token', data.login.accessToken)
                this.whoAmI()
            }
        }))
        .catch((e)=>{InfoStore.addMessage({message:e, type:'error'})})
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
            api("query{user{_id name}}")
            .then(action((data)=>{
                this.iam = data.user;
            }))
        }
    get shortName(){
        if(this.iam){
            const arr = this.iam.name.split(" ")
            let result = arr[0];
            if(arr[1]) result += " " + arr[1][0] +". ";
            if(arr[2]) result += arr[2][0] + ".";
            return result;
        }
        else return null
    }
}


const IamStore = new Iam()
export default IamStore