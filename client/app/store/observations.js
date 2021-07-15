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
            api("query{observations{_id text time photos}}")
            .then(action(({observations})=>{this.observations = observations}))
            .catch((e)=>{})
            .finally(action(()=>{this.isLoading = false}))
        }
    }


const ObservationsStore = new Observations()
export default ObservationsStore