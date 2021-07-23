import {action, makeAutoObservable  } from 'mobx'

class Reports{
    reports = []
    loading = false;
    error = null;
    filter =  {
        skip: 0, 
        limit: 10, 
        endDate: new Date(),
    }
    constructor() {
        makeAutoObservable(this)
        this.filter.startDate = new Date(this.filter.endDate.getTime()-24*60*60*1000)
    }
    setReports = (reports)=>{
        this.reports = reports;
    }
    setLoading = (loading)=>{
        this.loading = loading;
    }
    setError = (error)=>{
        this.error = error;
    }
}

const ReportsStore = new Reports()

export default ReportsStore