const { default: axios } = require("axios");
import api from '_app/api'

export default {
    get:()=>{
        return new Promise(async(done, fail)=>{
            try{
                const data = await api(`query{permissions{data{_id name read write} count}}`)
                done(data.permissions)
            }catch(e){
                fail(e)
            }
        })
    },
    update:(_id, payload)=>{
        return new Promise(async(done, fail)=>{
            try{
                console.log(_id, payload)
                const data = await api(`mutation update($_id: String, $read:[String], $write:[String]){update(_id:$_id,read:$read,write:$write){_id name read write}}`,
                {_id, ...payload})
                console.log("UPDATE DONE",data)
                done(data.permission)
            }catch(e){
                fail(e)
            }
        })
    },
    // create:(data)=>{
    //     return new Promise((done, fail)=>{
    //         axios.post(`${url}/key`, data)
    //         .then(({data})=>{
    //             console.log("API CREATE", data)
    //             done(data);
    //         }).catch((error)=>{fail(error.message)})
    //     }) 
    // },
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