import BaseStore from '_entities/Base/store'
import iface from './interface'
import {daysBefore} from "_app/time";

class AccessesStore extends BaseStore{
    constructor(iface) {
        super(iface);
        this.updateFilter(()=>({startDate: daysBefore(new Date(), 5), endDate: new Date(), limit: 9999999}))
    }
}

export default new AccessesStore(iface)