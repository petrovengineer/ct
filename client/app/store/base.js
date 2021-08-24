import {makeAutoObservable} from 'mobx'

const { default: axios } = require("axios");

const url = process.env.API+'/skud';

const api = {
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

class Base{
    data = undefined;
    loading = false;
    error = null;
    count = undefined;
    filter =  {
        skip: 0, 
        limit: 10, 
    }
    constructor(){
        makeAutoObservable(this)
    }
    setLoading = (loading) => {
        this.loading = loading;
    }
    setError = (error) => {
        this.error = error;
    }
    setData = (data, count) => {
        this.count = count;
        this.data = data;
    }
    setSkip = (skip) => {
        if(this.filter.skip!==skip)this.filter.skip = skip;
        this.fetch();
    }
    setDateRange = ([startDate, endDate]) => {
        this.filter.startDate = startDate;
        if(endDate!=null)endDate.setHours(23,59,59,999);
        this.filter.endDate = endDate;
        if(endDate != null){
            this.setSkip(0);
        }
    }
    fetch = async ()=>{
        const {data, count} = await api.get(this.filter);
        this.setData(data, count);
    }
}

export default new Base()