import {action, makeAutoObservable  } from 'mobx'
import api from '../api';

class Observations {
    observations = []
    isLoading = false;
    endDate = new Date();
    startDate = new Date(this.endDate.getTime()-24*60*60*1000);
    skip = 0;
    limit = 10;
    count = 0;
    constructor() {
        makeAutoObservable(this)
    }
    setSkip = (skip) => {
        this.skip = skip;
        this.getObservations();
    }
    setDateRange = ([startDate, endDate]) => {
        this.startDate = startDate;
        if(endDate!=null)endDate.setHours(23,59,59,999);
        this.endDate = endDate;
        if(endDate != null){
            this.getObservations();
            this.setSkip(0);
        }
    }
    getObservations = async () => {
        this.isLoading = true;
        const filter =  {
            skip: this.skip, 
            limit: this.limit, 
            startDate: this.startDate.toISOString(), 
            endDate: this.endDate.toISOString(),
        }
        const resCount = await api("query count($filter: FilterType){countObservations(filter: $filter)}", {filter});
        this.count = resCount.countObservations;
        api("query count($filter: FilterType){observations(filter: $filter){_id text time photos}}", 
        {filter})
        .then(action(({observations})=>{this.observations = observations}))
        .catch((e)=>{})
        .finally(action(()=>{this.isLoading = false}))
    }
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