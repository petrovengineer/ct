import {action, makeAutoObservable  } from 'mobx'
import api from '../api';

class Observations {
    observations = []
    isLoading = false;
    filter =  {
        skip: 0, 
        limit: 10, 
        endDate: new Date(),
    }
    constructor() {
        makeAutoObservable(this)
        this.filter.startDate = new Date(this.filter.endDate.getTime()-24*60*60*1000)
    }
    fetchData = async () => {
        this.isLoading = true;
        await this.getCount();
        await this.getObservations();
        this.isLoading = false;
    }
    setSkip = (skip) => {
        this.filter.skip = skip;
        this.fetchData();
    }
    setDateRange = ([startDate, endDate]) => {
        this.filter.startDate = startDate;
        if(endDate!=null)endDate.setHours(23,59,59,999);
        this.filter.endDate = endDate;
        if(endDate != null){
            this.setSkip(0);
            this.fetchData();
        }
    }
    getCount = async () => {
        const resCount = await api("query count($filter: FilterType){countObservations(filter: $filter)}", {filter: this.filter});
        this.count = resCount.countObservations;
    }
    getObservations = async () => {
        const {observations} = await api("query observations($filter: FilterType){observations(filter: $filter){_id text time photos author{_id name}}}", 
        {filter: this.filter})
        this.observations = observations;
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