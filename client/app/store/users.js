import {action, makeAutoObservable, configure  } from 'mobx'
import api from '../api';

class Users {
    users = []
    isLoading = false;
    constructor() {
        makeAutoObservable(this)
    }
    getUsers = () => {
            this.isLoading = true;
            api("query{users{_id name}}")
            .then(action(({users})=>{this.users = users}))
            .catch((e)=>{})
            .finally(action(()=>{this.isLoading = false}))
        }
    }


const UsersStore = new Users()
export default UsersStore