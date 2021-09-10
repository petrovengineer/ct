import {action, makeObservable, observable} from 'mobx'
import Info from '_store/info'

class Base{
    data = undefined;
    loading = false;
    error = null;
    count = undefined;
    filter =  {
        skip: 0, 
        limit: 10,
        sort: {
            created: -1
        }
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
            setDateRange: action,
            create: action,
            removeItem: action
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
        console.log("SET DATA", data, count)
        this.count = count;
        this.data = data;
    }
    removeItem = (_id) => {
        const index = this.data.findIndex((item)=>(item._id===_id))
        this.data.splice(index, 1);
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
        try{
            const {data, count} = await this.api.get(this.filter, this.sort);
            this.setData(data, count);
        }catch(e){
            Info.addMessage({message: e})
        }
    }
    create = async (data)=>{
        try{
            const item = await this.api.create(data);
            const newData = [...(this.data || [])];
            newData.unshift(item);
            this.setData(newData, this.count+1);
        }catch(e){
            Info.addMessage({message: e})
        }

    }
    remove = async (_id)=>{
        try{
            await this.api.remove(_id)
            this.removeItem(_id)
        }
        catch(e){
            Info.addMessage({message: e})
        }
    }
}

export default Base;