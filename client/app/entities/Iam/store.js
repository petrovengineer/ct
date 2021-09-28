import {action, makeAutoObservable} from 'mobx'
import InfoStore from '_store/info';
import iface from './interface'

class Iam {
    iam = null;
    isLoading = false;
    constructor(iface) {
        makeAutoObservable(this)
        this.iface = iface
    }
    async login(email, password){
        try{
            this.isLoading = true;
            const data = await this.iface.login(email, password)
            if(!data.accessToken)throw new Error('No access token')
            localStorage.setItem('token', data.accessToken)
            this.get()
        }
        catch(err){
            this.isLoading = false;
            InfoStore.addMessage({message:err, type:'error'})
        }
    }
    // reg = ({name = "Новый", email, password})=>{
    //     this.isLoading = true;
    //     const query = "mutation reg($name: String, $email: String!, $password: String){reg(name: $name, email: $email, password: $password) {accessToken}}";
    //     const variables = {name, email, password}
    //     api(query, variables)
    //         .then(action((data)=>{
    //             if(data.reg.accessToken){
    //                 localStorage.setItem('token', data.reg.accessToken)
    //                 this.whoAmI()
    //             }
    //         }))
    //         .catch((e)=>{})
    //         .finally(action(()=>{this.isLoading = false}))
    // }
    exit(){
        localStorage.removeItem('token');
        this.iam = null;
    }
    setIam(data){
        this.iam = data;
    }
    async get(){
        try{
            console.log("GET")
            this.isLoading = true;
            const data = await this.iface.get()
            this.setIam(data)
        }
        catch(err){
            this.isLoading = false;
            // localStorage.removeItem('token')
            InfoStore.addMessage({message:err, type:'error'})
        }
    }
}

export default new Iam(iface)