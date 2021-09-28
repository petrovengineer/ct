import store from './store'
import {observer} from "mobx-react";
import {useEffect} from "react";

class WithIam{
    constructor(store){
        this.store = store;
        return this.WithIam
    }
    WithIam = observer(function WithIam({children}){
        useEffect(()=>{
            const token = localStorage.getItem('token');
            if(token) this.store.get();
        }, [])
        return children(this.store)
    }.bind(this))
}

export default new WithIam(store)