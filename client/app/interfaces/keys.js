const { default: axios } = require("axios");

const url = process.env.API+'/skud';

export default {
    get:(filter, sort)=>{
        return new Promise((done, fail)=>{
            // let params = new URLSearchParams();
            // Object.keys(filter).map(key=>params.append(key, filter[key]))
            axios.get(`${url}/keysfull`, {params: filter})
            .then(({data})=>{
                console.log("API ", data)
                done(data);
            }).catch((error)=>{fail(error.message)})
        })
    },
    create:(data)=>{
        return new Promise((done, fail)=>{
            axios.post(`${url}/key`, data)
            .then(({data})=>{
                console.log("API CREATE", data)
                done(data);
            }).catch((error)=>{fail(error.message)})
        }) 
    },
    remove:(_id)=>{
        return new Promise((done, fail)=>{
            console.log("AXIOS ", _id)
            axios.delete(`${url}/key`, {params: {_id}})
            .then(()=>{
                console.log("API REMOVE OK")
                done();
            }).catch((error)=>{fail(error.message)})
        }) 
    }
}