import {action, makeAutoObservable , makeObservable, observable } from 'mobx'
import api from '../api';

class Reports{
    reports = undefined;
    loading = true;
    error = null;
    data = undefined;
    filter =  {
        skip: 0, 
        limit: 10, 
        // endDate: new Date(),
    }
    constructor() {
        makeAutoObservable(this)
        // this.filter.startDate = new Date(this.filter.endDate.getTime()-24*60*60*1000)
    }
    fetchData = async () => {
        try{
            // this.setLoading(true)
            const {reports:data} = await api("query reports($filter: FilterType){reports(filter: $filter){_id created author{_id name} observations{_id text}}}",
            {filter: this.filter})
            // this.setLoading(false)
            this.data = data;

        }
        catch(e){
            this.setError('Server Error!')
        }finally{}
    }
    setReports = (reports)=>{
        console.log("SET REPORTS ", reports);
        this.reports = reports;
    }
    setLoading = (loading)=>{
        this.loading = loading;
    }
    setError = (error)=>{
        this.error = error;
    }
    create = (observations) => {
        const modifedObservations = observations.map(({_id, text, time, photos})=>({_id, text, time, photos}))
        console.log(modifedObservations)
        api("mutation createReport($observations: [ObservationsInputType]){createReport(observations: $observations){_id observations{_id text time photos} author{_id name} created}}", 
        // api("mutation createObservation($text: String, $time: String){createObservation(text: $text, time: $time) {_id time text photos author{_id name}}}", 
            {observations:modifedObservations})
        .then(action(({createReport: newReport})=>{
            console.log(newReport);
            this.addItem(newReport);
        }))
        .catch((e)=>{console.log(e)})
        .finally(action(()=>{this.loading = false}))  
    }
    addItem = (item)=>{
        this.data.unshift(item);
        console.log(this.data)
    }
}

const ReportsStore = new Reports()

export default ReportsStore