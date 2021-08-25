import {action, makeObservable, observable} from 'mobx'

class Base{
    data = undefined;
    loading = false;
    error = null;
    count = undefined;
    filter =  {
        skip: 0, 
        limit: 10,
    }
    constructor(api){
        makeObservable(this, {
            data: observable,
            loading: observable,
            error: observable,
            count: observable,
            filter: observable,
            setLimit: action,
            setData: action,
            setSkip: action,
            setDateRange: action
        })
        this.api = api;
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
    setLimit = (limit) => {
        if(this.filter.limit===limit)return;
        this.filter.skip = 0;
        this.filter.limit = limit;
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
        const {data, count} = await this.api.get(this.filter);
        this.setData(data, count);
    }
}

export default Base;