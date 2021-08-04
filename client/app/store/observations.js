import {action, makeAutoObservable, observable, makeObservable  } from 'mobx'
import api from '../api';

class Observations {
    data = undefined;
    loading = false;
    error = null;
    count = undefined;
    filter =  observable({
        skip: 0, 
        limit: 10, 
        endDate: new Date(),
    })
    constructor() {
        // makeAutoObservable(this)
        makeObservable(this, {
            loading: observable,
            error: observable,
            data: observable,
            setSkip: action,
            setDateRange: action,
            setLoading: action,
            setError: action,
            setData:action,
            fetchData:action
        })
        this.filter.startDate = new Date(this.filter.endDate.getTime()-24*60*60*1000)
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
        this.fetchData();
    }
    setDateRange = ([startDate, endDate]) => {
        this.filter.startDate = startDate;
        if(endDate!=null)endDate.setHours(23,59,59,999);
        this.filter.endDate = endDate;
        if(endDate != null){
            this.setSkip(0);
        }
    }
    fetchData = async () => {
        try{
            this.setLoading(true)
            const {observations:data} = await api("query observations($filter: FilterType){observations(filter: $filter){observations{_id text time photos author{_id name}} count}}", 
            {filter: this.filter})
            this.setLoading(false)
            this.setData(data.observations, data.count)
        }
        catch(e){
            this.setError('Server Error!')
        }finally{}
    }
    create = (text, time) => {
        api("mutation createObservation($text: String, $time: String){createObservation(text: $text, time: $time) {_id time text photos author{_id name}}}", 
            {text, time})
        .then(action(({createObservation: newObservation})=>{
            console.log(newObservation);
            this.addItem(newObservation);
            // this.setData([],0)
            // this.data.unshift(newObservation)
        }))
        .catch((e)=>{})
        .finally(action(()=>{this.loading = false}))  
    }
    addItem = (item)=>{
        const newData = [item, ...this.data];
        this.data = newData;
        // this.data.unshift(item);
    }
    deleteImage = (link, oid, index) => {
        api("mutation deletePhoto($link: String, $oid: String){deletePhoto(link: $link, oid: $oid){_id text time photos}}", {link, oid})
        .then(action(({deletePhoto:updatedObservation})=>{
            console.log(updatedObservation)
            this.data[index] = updatedObservation;
        }))
        .catch(e=>console.log("Delete Image Error ", e))
    }
    addImage = (link, index) => {
        const updated = Object.assign({}, this.data[index]);
        updated.photos.push(link);
        this.data[index] = updated;
        console.log(this.data);
    }
    change = (newItem) => {

    }
}


const ObservationsStore = new Observations()

export default ObservationsStore