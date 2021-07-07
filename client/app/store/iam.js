import {action, makeAutoObservable, configure  } from 'mobx'
import api from '../api';

class Iam {
    iam = null;
    isLoading = false;
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
    whoAmI = () => {
            api("query{user{name secondName}}")
            .then(action((data)=>{
                this.iam = data.user;
            }))
        }
    }


const IamStore = new Iam()
export default IamStore