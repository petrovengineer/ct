import BaseIface from '_entities/Base/interface'
import queries from './queries'
import {default as axios} from "axios";

class KeysIface extends BaseIface{
    url = process.env.API_SKUD
    constructor(queries) {
        super(queries);
    }
    get = (filter, sort)=>{
        return new Promise((done, fail)=>{
            // let params = new URLSearchParams();
            // Object.keys(filter).map(key=>params.append(key, filter[key]))
            axios.get(`${this.url}/keysfull`, {params: filter})
            .then(({data})=>{
            console.log("AXIOS RESPONSE ", data)
            done(data);
        }).catch((error)=>{fail(error.message)})
        })
    }
    create =(data)=>{
        return new Promise((done, fail)=>{
            axios.post(`${this.url}/key`, data)
                .then(({data})=>{
                    console.log("API CREATE", data)
                    done(data);
                }).catch((error)=>{fail(error.message)})
        })
    }
    remove =(_id)=>{
        return new Promise((done, fail)=>{
            console.log("AXIOS ", _id)
            axios.delete(`${this.url}/key`, {params: {_id}})
                .then(()=>{
                    console.log("API REMOVE OK")
                    done();
                }).catch((error)=>{fail(error.message)})
        })
    }
}

export default new KeysIface(queries)