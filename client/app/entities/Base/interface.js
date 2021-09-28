const { default: axios } = require("axios");
import api from '_app/api'

export default class Interface{
    constructor(queries){
        this.queries = queries;
    }
    get = (filter)=>{
        return new Promise(async(resolve, reject)=>{
            try{
                const response = await api(this.queries.get, {filter})
                const data = response[this.queries.selectors.get];
                // console.log("IFACE ", Array.isArray(data))
                if(Array.isArray(data)){
                    resolve({data, count: null})
                }
                resolve({data: data[this.queries.selectors.get], count: data.count})
            }catch(err){
                reject(err)
            }
        })
    }
    create = (payload)=>{
        return new Promise(async(resolve, reject)=>{
            try{
                const data = await api(this.queries.create, payload)
                console.log("IFACE CREATE ", data[this.queries.selectors.create])
                resolve(data[this.queries.selectors.create])
            }catch(err){
                reject(err)
            }
        }) 
    }
    // update = (_id, payload)=>{
    //     return new Promise(async(done, fail)=>{
    //         try{
    //             console.log(_id, payload)
    //             const data = await api(`mutation update($_id: String, $read:[String], $write:[String]){update(_id:$_id,read:$read,write:$write){_id name read write}}`,
    //             {_id, ...payload})
    //             console.log("UPDATE DONE",data)
    //             done(data.permission)
    //         }catch(e){
    //             fail(e)
    //         }
    //     })
    // }

    // remove:(_id)=>{
    //     return new Promise((done, fail)=>{
    //         console.log("AXIOS ", _id)
    //         axios.delete(`${url}/key`, {params: {_id}})
    //         .then(()=>{
    //             console.log("API REMOVE OK")
    //             done();
    //         }).catch((error)=>{fail(error.message)})
    //     }) 
    // }
}