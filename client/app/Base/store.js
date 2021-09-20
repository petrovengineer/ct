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
    }
    constructor(interface){
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
            removeItem: action,
            setId: action,
            setFilter: action,
            setItem: action,
        })
        this.interface = interface;
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
    setItem = (item, index)=>{
        this.data[index] = item;
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
    setFilter = (filter) => {
        this.filter = filter;
    }
    setId = (_id) => {
        this.filter._id = _id
    }
    setDateRange = ([startDate, endDate]) => {
        this.filter.startDate = startDate;
        if(endDate!=null)endDate.setHours(23,59,59,999);
        this.filter.endDate = endDate;
        if(endDate != null){
            this.setSkip(0);
        }
    }
    async fetch(done){
        try{
            const response = await this.interface.get(this.filter);
            const payload = this.interface.extractData && this.interface.extractData(response)
            if(payload)this.setData(payload.data, payload.count);
            if(done)done({data: payload.data, count: payload.count})
        }catch(e){
            Info.addMessage({message: e})
        }
    }
    create = async (data)=>{
        try{
            const response = await this.interface.create(data);
            const item = this.interface.extractData && this.interface.extractCreate(response)
            const newData = [...(this.data || [])];
            newData.unshift(item);
            this.setData(newData, this.count+1);
        }catch(e){
            Info.addMessage({message: e})
        }

    }
    remove = async (_id)=>{
        try{
            await this.interface.remove(_id)
            this.removeItem(_id)
        }
        catch(e){
            Info.addMessage({message: e})
        }
    }
}

export default Base;