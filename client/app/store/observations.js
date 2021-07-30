import {action, makeAutoObservable, observable, makeObservable  } from 'mobx'
import api from '../api';

class Observations {
    observations = undefined;
    loading = false;
    error = null;
    count = undefined;
    refresh = null;
    filter =  observable({
        skip: 0, 
        limit: 10, 
        endDate: new Date(),
    })
    constructor() {
        // makeAutoObservable(this)
        makeObservable(this, {
            loading: observable,
            observations: observable,
            setSkip: action,
            setDateRange: action,
            setLoading: action,
            refresh: observable,
            setObservations:action
        })
        this.filter.startDate = new Date(this.filter.endDate.getTime()-24*60*60*1000)
    }
    setLoading = (loading) => {
        this.loading = loading;
    }
    setError = (loading) => {
        this.loading = loading;
    }
    setObservations = (observations, count) => {
        this.count = count;
        this.observations = observations;
    }
    doRefresh = () => {this.refresh = Math.random()*100000;}
    setSkip = (skip) => {
        if(this.filter.skip!==skip)this.filter.skip = skip;
        this.doRefresh();
    }
    setDateRange = ([startDate, endDate]) => {
        this.filter.startDate = startDate;
        if(endDate!=null)endDate.setHours(23,59,59,999);
        this.filter.endDate = endDate;
        if(endDate != null){
            this.setSkip(0);
        }
    }
    getCount = async () => {
        const resCount = await api("query count($filter: FilterType){countObservations(filter: $filter)}", {filter: this.filter});
        this.count = resCount.countObservations;
    }
    getObservations = action(async () => {
        const {observations:data} = await api("query observations($filter: FilterType){observations(filter: $filter){observations{_id text time photos author{_id name}} count}}", 
        {filter: this.filter})
        this.observations = data.observations;
        this.count = data.count;
    })
    createObservation = (text, time) => {
        api("mutation createObservation($text: String, $time: String){createObservation(text: $text, time: $time) {_id time text photos author{_id name}}}", 
            {text, time})
        .then(action(({createObservation: newObservation})=>{this.observations.unshift(newObservation)}))
        .catch((e)=>{})
        .finally(action(()=>{this.isLoading = false}))  
    }
    deleteImage = (link, oid, index) => {
        api("mutation deletePhoto($link: String, $oid: String){deletePhoto(link: $link, oid: $oid){_id text time photos}}", {link, oid})
        .then(action(({deletePhoto:updatedObservation})=>{
            this.observations[index] = updatedObservation;
        }))
        .catch(e=>console.log("Delete Image Error ", e))
    }
    addImage = (link, index) => {
        const newO = Object.assign({}, this.observations[index]);
        newO.photos.push(link)
        this.observations[index] = newO;
    }
}


const ObservationsStore = new Observations()

export default ObservationsStore