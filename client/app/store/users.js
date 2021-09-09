import {action, makeAutoObservable, configure  } from 'mobx'
import api from '../api';

class Users {
    data = undefined
    isLoading = false;
    constructor() {
        makeAutoObservable(this)
    }
    fetch = () => {
            this.isLoading = true;
            api("query{users{_id name}}")
            .then(action(({users})=>{this.data = users}))
            .catch((e)=>{})
            .finally(action(()=>{this.isLoading = false}))
        }
    }


const UsersStore = new Users()
export default UsersStore