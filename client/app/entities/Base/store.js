import {action, makeObservable, observable, makeAutoObservable, computed} from 'mobx'
import Info from '_store/info'

class Base{
    name = 'Default name'
    data = undefined;
    loading = false;
    error = null;
    count = undefined;
    filter =  {
        skip: 0, 
        limit: 10,
    }
    constructor(iface){
        makeObservable(this, {
            data: observable,
            loading: observable,
            error: observable,
            count: observable,
            setData: action,
            create: action,
            removeItem: action,
            setItem: action,
            filter: observable,
            cachedData: computed
        })

        this.iface = iface;
    }
    get cachedData(){
        console.log("CACHED")
        if(!this.data)this.get()
        else return this.data
    }
    updateFilter = action(function(updater){
        const data = updater(this.filter)
        Object.keys(data).map(key=>{
            if(typeof data[key]!== 'undefined')this.filter[key] = data[key];
        })
    }.bind(this))
    setLoading = (loading) => {
        this.loading = loading;
    }
    setError = (error) => {
        this.error = error;
    }
    setData = (data, count) => {
        this.count = count;
        console.log("SET DATA ", data, count)
        this.data = data;
    }
    setItem = (item, index)=>{
        this.data[index] = item;
    }
    setId = (_id) => {
        this.filter._id = _id
    }
    removeItem = (_id) => {
        const index = this.data.findIndex((item)=>(item._id===_id))
        this.data.splice(index, 1);
    }
    get = async (done) => {
        try{
            const data = await this.iface.get(this.filter);
            if(data)this.setData(data.data, data.count);
            if(done)done({data: data.data, count: data.count})
        }catch(err){
            Info.addMessage({message: err})
        }
    }
    create = async (payload)=>{
        try{
            const data = await this.iface.create(payload);
            const newData = [...(this.data || [])];
            newData.unshift(data);
            this.setData(newData, this.count+1);
        }catch(err){
            Info.addMessage({message: err})
        }

    }
    remove = async (_id)=>{
        try{
            await this.iface.remove(_id)
            this.removeItem(_id)
        }
        catch(e){
            Info.addMessage({message: e})
        }
    }
}

export default Base;