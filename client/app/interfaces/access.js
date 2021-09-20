
const { default: axios } = require("axios");

const url = process.env.API+'/skud';

export default {
    get:(filter)=>{
        return new Promise((done, fail)=>{
            // let params = new URLSearchParams();
            // Object.keys(filter).map(key=>params.append(key, filter[key]))
            axios.get(`${url}/access`, {params: filter})
            .then(({data})=>{
                console.log(data)
                done(data);
            }).catch((error)=>{fail(error.message)})
        }) 
    }
}