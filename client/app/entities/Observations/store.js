import BaseStore from '_entities/Base/store'
import iface from './interface'
import {action} from "mobx";
import Info from "_store/info";

class ObservationsStore extends BaseStore{
    constructor(iface) {
        super(iface);
        this.updateFilter(()=>({startDate:new Date(0), endDate: new Date(), limit: 20}))
    }
    deleteImage = async(link, oid, index) => {
        try{
            const response = await this.iface.deleteImage({link, oid})
            this.setItem(response, index)
        }catch(err){
            Info.addMessage({message: err})
        }
    }
    addImage = action((link, index) => {
        const updated = Object.assign({}, this.data[index]);
        updated.photos.push(link);
        this.data[index] = updated;
    })
}

export default new ObservationsStore(iface)