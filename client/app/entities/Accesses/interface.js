import BaseIface from '_entities/Base/interface'
import queries from './queries'
import {default as axios} from "axios";

class AccessesIface extends BaseIface{
    url = process.env.API_SKUD
    constructor(queries) {
        super(queries);
    }
    get = (filter)=>{
    return new Promise((done, fail)=>{
    // let params = new URLSearchParams();
    // Object.keys(filter).map(key=>params.append(key, filter[key]))
    axios.get(`${this.url}/access`, {params: filter})
        .then(({data})=>{
        console.log("AXIOS RESPONSE ", data)
        done(data);
        }).catch((error)=>{fail(error.message)})
        })
    }
}

export default new AccessesIface(queries)