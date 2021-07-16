import {action, makeAutoObservable  } from 'mobx'
import api from '../api';

class Observations {
    observations = []
    isLoading = false;
    constructor() {
        makeAutoObservable(this)
    }
    getObservations = () => {
        this.isLoading = true;
        api("query getObservations($filter: FilterType){observations(filter: $filter){_id text time photos}}", {filter: {skip:0, limit: 10}})
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