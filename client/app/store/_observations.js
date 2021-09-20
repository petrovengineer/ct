import api from '_interfaces/observations'
import Base from '_store/base'
import {action, makeObservable, observable} from 'mobx'
import getClearDate from '_app/time'
import Info from '_store/info'

class Observations extends Base{
    constructor(api){
        super(api)
        this.filter.startDate = new Date(0)
        this.filter.endDate = new Date()
    }
    updateFilter = action(function(updater){
        const data = updater(this.filter)
        Object.keys(data).map(key=>this.filter[key] = data[key])
    })
    deleteImage = async(link, oid, index) => {
        try{
            const response = await this.api.deleteImage({link, oid})
            const updated = this.api.extractImageUpdated(response)
            this.setItem(updated, index)
        }catch(e){
                Info.addMessage({message: e})
        }
    }
    addImage = action((link, index) => {
        const updated = Object.assign({}, this.data[index]);
        updated.photos.push(link);
        this.data[index] = updated;
        console.log(this.data);
    })
    // prepareForReport = action(function(){
    //     this.filter.limit = null;
    //     this.filter.startDate = new Date(this.filter.endDate.getTime()-24*60*60*1000)
    //     this.filter.endDate = new Date()
    // })
    // reset = action(function Reset(){
    //     const limit = 10, startDate = new Date(0), endDate = new Date()
    //     if(limit===this.filter.limit 
    //         && getClearDate(startDate).getTime() === getClearDate(this.filter.startDate.getTime()) 
    //         && getClearDate(endDate).getTime() === getClearDate(this.filter.endDate).getTime())return;
    //     this.filter.limit = 10;
    //     this.filter.startDate = new Date(0)
    //     this.filter.endDate = new Date()
    // })
}

export default new Observations(api)