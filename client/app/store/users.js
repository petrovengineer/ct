import axios from 'axios'
import {observable, action, makeAutoObservable, configure  } from 'mobx'

configure({
    useProxies: "always"
})

class Users {
    @observable users = []
    constructor() {
        makeAutoObservable(this)
    }
    @action getUsers = () => {
            axios.post('http://localhost:3000',{"query":"query{users{_id name}}"})
            .then((response)=>{
                this.users = response.data.data.users;
            })
            .catch((e)=>{
                if(e.response && e.response.data && Array.isArray(e.response.data.errors)){
                    console.log(e.response.data.errors[0].message);
                }
            })
        }
    }


const UsersStore = new Users()
export default UsersStore